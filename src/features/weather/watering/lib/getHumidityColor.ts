import { SoilMoisturePlant } from '../model/types'

export const getHumidityColor = (value: SoilMoisturePlant['value']) => {
  if (!value) return '#ef4444'

  if (value < 30) return '#ef4444'
  if (value < 50) return '#f59e0b'
  if (value < 70) return '#10b981'
  return '#3b82f6'
}
