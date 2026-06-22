import axios, { type AxiosInstance } from 'axios'

const NEXT_PUBLIC_API_STATION_URL = process.env.NEXT_PUBLIC_API_STATION_URL

export const stationClient: AxiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_STATION_URL,
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
})

stationClient.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Есть ответ от сервера, но с ошибкой
        console.error('API. Server error:', {
          headers: error.response.headers,
          status: error.response.status,
          data: error.response.data,
        })
      } else if (error.request) {
        // Запрос отправлен, но ответа нет
        console.error('API. Network error (no response):', {
          message: error.message,
          config: error.config,
          request: error.request,
        })
      } else {
        // Ошибка при настройке запроса (например, bad URL)
        console.error('API. Request setup error:', error.message)
      }
    }

    return Promise.reject(error)
  }
)
