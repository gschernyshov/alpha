import { WeatherWidget, WeatherMonitoringWidget } from '@/widgets/weather'
import { fetchWeather } from '@/entities/weather'

export const WeatherPage = async () => {
  const weather = await fetchWeather()

  return (
    <>
      <WeatherWidget />
      <WeatherMonitoringWidget weather={weather} />
    </>
  )
}
