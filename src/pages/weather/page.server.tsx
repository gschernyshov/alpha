import { WeatherPage } from './UI/WeatherPage'
import { fetchWeather } from '@/entities/weather'

export const renderWeatherPage = async () => {
  const weather = await fetchWeather()

  return <WeatherPage weather={weather} />
}
