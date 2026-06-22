import { Thermometer, CloudRain, Sun, Sprout } from 'lucide-react'
import {
  ANCHOR_TEMPERATURE,
  ANCHOR_HUMIDITY,
  ANCHOR_ILLUMINATION,
  ANCHOR_WATERING,
} from '@/src/features/weather'

export const features = [
  {
    id: ANCHOR_TEMPERATURE,
    Icon: Thermometer,
    title: 'Температура',
    description: 'DHT11',
  },
  {
    id: ANCHOR_HUMIDITY,
    Icon: CloudRain,
    title: 'Влажность',
    description: 'DHT11',
  },
  {
    id: ANCHOR_ILLUMINATION,
    Icon: Sun,
    title: 'Уровень освещения',
    description: 'Фоторезистор',
  },
  {
    id: ANCHOR_WATERING,
    Icon: Sprout,
    title: 'Влажность почвы',
    description: 'Резистивный датчик',
  },
]
