import axios from 'axios'

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const TELEGRAM_API_BASE_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`

export const telegramClient = axios.create({
  baseURL: TELEGRAM_API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

telegramClient.interceptors.response.use(
  response => response,
  error => {
    if (axios.isAxiosError(error) && error.response?.data) {
      console.error('Telegram API Error:', error.response.data)
    } else {
      console.error('Telegram API Error:', error.message)
    }
    return Promise.reject(error)
  }
)
