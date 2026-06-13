export type Temperature = number | null
export type Humidity = number | null
export type Illumination = number | null
export type WeatherDate = string | null

export type UnitTemp = 'C' | 'F' | 'K'
export type Mode = 'home' | 'city'

export type WeatherApiResponse = {
  temperature: number
  humidity: number
  illumination: number
}
