'use client'

import { useWeatherPolling } from '../model/useWeatherPolling'
import { SoilMoistureApiResponse } from '@/features/weather'
import type { WeatherApiResponse } from '@/entities/weather'

interface WeatherMonitoringProps {
  weather?: WeatherApiResponse
  soilMoisture?: SoilMoistureApiResponse
}

export const WeatherMonitoring = ({
  weather,
  soilMoisture,
}: WeatherMonitoringProps) => {
  useWeatherPolling({ weather, soilMoisture, intervalMs: 15000 })
  return null
}
