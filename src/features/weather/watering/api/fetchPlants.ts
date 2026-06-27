import type { PlantsApiResponse } from '../model/types'
import { apiClient } from '@/shared/api/client'

export const fetchPlants = async (
  signal?: AbortSignal
): Promise<PlantsApiResponse> => {
  const response = await apiClient.get<PlantsApiResponse>('/plants', {
    signal,
  })
  return response.data
}
