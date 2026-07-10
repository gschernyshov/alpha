import { fetchWeather } from '../api/fetchWeather'

export const createWeatherMetadata = async () => {
  try {
    const weather = await fetchWeather()

    if (weather?.indoor) {
      return {
        title: `Погода | ${weather.indoor.temperature} °C`,
        description: `Температура: ${weather.indoor.temperature} °C, влажность: ${weather.indoor.humidity} %, уровень освещения: ${weather.indoor.illumination} лк. 'Мониторинг погодных условий в реальном времени.`,
      }
    }
  } catch (error) {
    console.error('Metadata generation failed: ', error)
  }

  return {
    title: 'Погода | Нет данных',
    description: 'Не удалось загрузить данные погоды в реальном времени.',
  }
}
