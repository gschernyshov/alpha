'use client'

import { useWeatherPolling } from '@/src/features/weather'

export const WeatherMonitoringWidget = () => {
  useWeatherPolling({ intervalMs: 15000 })
  return null
}
