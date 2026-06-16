import type { Humidity, Illumination } from '../model/types'

export const safeValue = (value: Humidity | Illumination): number => {
  return Math.max(0, Math.min(100, value ?? 0))
}
