import type { WateringApiRequest } from '../model/types'
import { apiClient } from '@/shared/api/client'

export const fetchWateringStart = async (
  data: WateringApiRequest,
  signal?: AbortSignal
): Promise<void> => {
  await apiClient.post<void>('/watering/start', data, {
    signal,
  })
}
