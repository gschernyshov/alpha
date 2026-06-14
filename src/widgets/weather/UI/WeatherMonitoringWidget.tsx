'use client'

import { useWeatherPolling } from '@/features/weather'

export const WeatherMonitoringWidget = () => {
  useWeatherPolling({ intervalMs: 15000 })
  return null
}
