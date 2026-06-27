import { apiClient } from '@/shared/api/client'

export const fetchSatusStation = async (
  signal?: AbortSignal
): Promise<void> => {
  const response = await apiClient.get<void>('/status-station', {
    signal,
  })
  return response.data
}
