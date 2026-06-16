import { useEffect } from 'react'
import axios from 'axios'
import {
  type WeatherApiResponse,
  useWeatherStore,
  fetchWeather,
} from '@/entities/weather'

interface UseWeatherPollingProps {
  weather?: WeatherApiResponse
  intervalMs?: number
  enabled?: boolean
}

export const useWeatherPolling = ({
  weather,
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
        const data = await fetchWeather(abortController.signal)

        useWeatherStore.getState().setWeather(data)
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Weather request cancelled')
        } else if ((error as Error).name !== 'AbortError') {
          console.error('Weather polling error: ', error)
        }
      }
    }

    if (weather) {
      useWeatherStore.getState().setWeather(weather)
    } else {
      fetchData()
    }

    intervalId = setInterval(fetchData, intervalMs)

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (abortController) abortController.abort()
    }
  }, [weather, intervalMs, enabled])
}
