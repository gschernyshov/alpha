import { Leaf } from 'lucide-react'
import { WeatherMode } from '@/entities/weather'

export const getMode = (label: WeatherMode['label']): WeatherMode => {
  return {
    Icon: Leaf,
    label: label,
  }
}

export const getAvailableModes = (
  labels: WeatherMode['label'][]
): WeatherMode[] => {
  return labels.map(label => getMode(label))
}
