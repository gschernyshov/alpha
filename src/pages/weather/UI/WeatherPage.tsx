import { WeatherWidget, WeatherMonitoringWidget } from '@/widgets/weather'
import type { WeatherApiResponse } from '@/entities/weather'

interface WeatherPageProps {
  weather: WeatherApiResponse
}

export const WeatherPage = ({ weather }: WeatherPageProps) => {
  return (
    <>
      <WeatherWidget />
      <WeatherMonitoringWidget weather={weather} />
    </>
  )
}
