'use client'

import { useWeatherPolling } from '@/features/weather'
import type { WeatherApiResponse } from '@/entities/weather'

interface WeatherMonitoringProps {
  weather?: WeatherApiResponse
}

export const WeatherMonitoring = ({ weather }: WeatherMonitoringProps) => {
  useWeatherPolling({ weather, intervalMs: 15000 })
  return null
}
