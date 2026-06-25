import type { LucideIcon } from 'lucide-react'

export type WeatherMode = {
  Icon: LucideIcon
  label: string
}

export type Temperature = number | null
export type Humidity = number | null
export type Illumination = number | null
export type WeatherDate = string | null

export type WeatherIndoor = {
  temperature: Temperature
  humidity: Humidity
  illumination: Illumination
  date: WeatherDate
}

export type WeatherOutdoor = {
  temp: number | null
  feelsLike: number | null
  humidity: number | null
  pressure: number | null
  windSpeed: number | null
  time: string | null
}

export type WeatherApiResponse = {
  indoor: WeatherIndoor
  outdoor: WeatherOutdoor
}
