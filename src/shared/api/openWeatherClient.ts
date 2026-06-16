import axios, { type AxiosInstance } from 'axios'

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY

export const openWeatherClient: AxiosInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5',
  timeout: 5000,
  headers: {
    'User-Agent': 'MyWeatherApp/1.0 (github.com/gschernyshov)',
  },
  params: {
    appid: OPENWEATHER_API_KEY,
    units: 'metric',
    lang: 'ru',
  },
})

openWeatherClient.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Есть ответ от сервера, но с ошибкой
        console.error('OpenWeather API. Server error:', {
          headers: error.response.headers,
          status: error.response.status,
          data: error.response.data,
        })
      } else if (error.request) {
        // Запрос отправлен, но ответа нет
        console.error('OpenWeather API. Network error (no response):', {
          message: error.message,
          config: error.config,
          request: error.request,
        })
      } else {
        // Ошибка при настройке запроса (например, bad URL)
        console.error('OpenWeather API. Request setup error:', error.message)
      }
    }

    return Promise.reject(error)
  }
)
