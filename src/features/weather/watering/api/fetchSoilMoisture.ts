import type { SoilMoistureApiResponse } from '../model/types'
import { apiClient } from '@/shared/api/client'

export const fetchSoilMoisture = async (
  signal?: AbortSignal
): Promise<SoilMoistureApiResponse> => {
  const response = await apiClient.get<SoilMoistureApiResponse>(
    '/soil-moisture',
    {
      signal,
    }
  )
  return response.data
}
