import {
  WeatherHero,
  WeatherFeatures,
  WeatherMonitoring,
} from '@/widgets/weather'
import { fetchWeather } from '@/entities/weather'

export const WeatherPage = async () => {
  const weather = await fetchWeather()

  return (
    <div className="flex flex-col gap-2.5 md:gap-5 p-2.5 md:p-5">
      <WeatherHero />
      <WeatherFeatures />
      <WeatherMonitoring weather={weather} />
    </div>
  )
}
