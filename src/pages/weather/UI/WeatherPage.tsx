import {
  WeatherHero,
  WeatherFeatures,
  WeatherMonitoring,
} from '@/widgets/weather'
import { fetchSoilMoisture } from '@/features/weather'
import { fetchWeather } from '@/entities/weather'

export const WeatherPage = async () => {
  const [weather, soilMoisture] = await Promise.all([
    fetchWeather(),
    fetchSoilMoisture(),
  ])

  return (
    <div className="flex flex-col gap-2.5 md:gap-5 p-2.5 md:p-5">
      <WeatherHero />
      <WeatherFeatures />

      <WeatherMonitoring weather={weather} soilMoisture={soilMoisture} />
    </div>
  )
}
