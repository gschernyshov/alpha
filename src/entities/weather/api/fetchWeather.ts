import { WeatherApiResponse } from '../model/types'
import { apiClient } from '@/src/shared/api/client'

export const fetchWeather = async (
  signal?: AbortSignal
): Promise<WeatherApiResponse> => {
  const response = await apiClient.get<WeatherApiResponse>('/weather', {
    signal,
  })
  return response.data
}
