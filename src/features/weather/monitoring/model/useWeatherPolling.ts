import { useEffect } from 'react'
import axios from 'axios'
import { useWeatherStore, fetchWeather } from '@/entities/weather'

type UseWeatherPollingProps = {
  intervalMs?: number
  enabled?: boolean
}

export const useWeatherPolling = ({
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

        useWeatherStore.getState().setWeather({
          temperature: {
            value: data.temperature,
            date: new Date().toISOString(),
          },
          humidity: { value: data.humidity, date: new Date().toISOString() },
          illumination: {
            value: data.illumination,
            date: new Date().toISOString(),
          },
        })
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Weather request cancelled')
        } else if ((error as Error).name !== 'AbortError') {
          console.error('Weather polling error: ', error)
        }
      }
    }

    fetchData()

    intervalId = setInterval(fetchData, intervalMs)

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (abortController) abortController.abort()
    }
  }, [intervalMs, enabled])
}
