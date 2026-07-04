import { fetchWeather } from '../api/fetchWeather'

export const createWeatherMetadata = async () => {
  const weather = await fetchWeather()

  return {
    title: `Погода | ${weather.indoor.temperature} °C`,
    description: `Температура: ${weather.indoor.temperature} °C, влажность: ${weather.indoor.humidity} %, уровень освещения: ${weather.indoor.illumination} лк. 'Мониторинг погодных условий в реальном времени.`,
  }
}
