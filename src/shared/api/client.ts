import axios, { type AxiosInstance } from 'axios'
import { handleApiError } from './apiErrors'

const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const apiClient: AxiosInstance = axios.create({
  baseURL: NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(handleApiError(error))
  }
)
