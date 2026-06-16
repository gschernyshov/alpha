import { WeatherPage } from './UI/WeatherPage'
import { fetchWeather } from '@/entities/weather'

export const renderWeatherPage = async () => {
  console.log('RENDER', Date.now())

  const weather = await fetchWeather()

  return <WeatherPage weather={weather} />
}
