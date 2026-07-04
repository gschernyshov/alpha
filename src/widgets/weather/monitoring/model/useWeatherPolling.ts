import { useEffect } from 'react'
import axios from 'axios'
import {
  useWeatherStore,
  fetchWeather,
  type WeatherApiResponse,
} from '@/entities/weather'
import {
  useSoilMoisturePlantsStore,
  fetchSoilMoisture,
  SoilMoistureApiResponse,
} from '@/features/weather'

interface UseWeatherPollingProps {
  weather?: WeatherApiResponse
  soilMoisture?: SoilMoistureApiResponse
  intervalMs?: number
  enabled?: boolean
}

export const useWeatherPolling = ({
  weather,
  soilMoisture,
  intervalMs = 10000,
  enabled = true,
}: UseWeatherPollingProps) => {
  useEffect(() => {
    if (!enabled) return

    let abortController: AbortController | null = null
    let intervalId: NodeJS.Timeout | null = null

    const fetchData = async () => {
      if (abortController) {
        abortController.abort()
      }
      abortController = new AbortController()

      try {
        const [weatherResult, soilMoistureResult] = await Promise.all([
          fetchWeather(abortController.signal),
          fetchSoilMoisture(abortController.signal),
        ])

        useWeatherStore.getState().setWeather(weatherResult)
        useSoilMoisturePlantsStore
          .getState()
          .setSoilMoisturePlants(soilMoistureResult)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Weather request cancelled')
        } else {
          console.error('Weather polling error: ', error)
        }
      }
    }

    if (weather) {
      useWeatherStore.getState().setWeather(weather)
    }

    if (soilMoisture) {
      useSoilMoisturePlantsStore.getState().setSoilMoisturePlants(soilMoisture)
    }

    if (!weather || !soilMoisture) {
      fetchData()
    }

    intervalId = setInterval(fetchData, intervalMs)

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (abortController) abortController.abort()
    }
  }, [weather, soilMoisture, intervalMs, enabled])
}
