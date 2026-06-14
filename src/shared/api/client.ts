import axios from 'axios'

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error: ', error.message)

    return Promise.reject(error)
  }
)
