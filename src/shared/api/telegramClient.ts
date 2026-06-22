import axios, { type AxiosInstance } from 'axios'

const TELEGRAM_API_URL = process.env.TELEGRAM_API_URL
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_BASE_URL = `${TELEGRAM_API_URL}${TELEGRAM_BOT_TOKEN}`

export const telegramClient: AxiosInstance = axios.create({
  baseURL: TELEGRAM_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

telegramClient.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Есть ответ от сервера, но с ошибкой
        console.error('Telegram API. Server error:', {
          headers: error.response.headers,
          status: error.response.status,
          data: error.response.data,
        })
      } else if (error.request) {
        // Запрос отправлен, но ответа нет
        console.error('Telegram API. Network error (no response):', {
          message: error.message,
          config: error.config,
          request: error.request,
        })
      } else {
        // Ошибка при настройке запроса (например, bad URL)
        console.error('Telegram API. Request setup error:', error.message)
      }
    }

    return Promise.reject(error)
  }
)
