'use client'

import { useWeatherPolling } from '@/features/weather'
import type { WeatherApiResponse } from '@/entities/weather'

interface WeatherMonitoringWidgetProps {
  weather?: WeatherApiResponse
}

export const WeatherMonitoringWidget = ({
  weather,
}: WeatherMonitoringWidgetProps) => {
  useWeatherPolling({ weather, intervalMs: 15000 })
  return null
}
