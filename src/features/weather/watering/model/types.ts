import type { WeatherDate } from '@/entities/weather'

export type WaterStatus = 'PENDING' | 'SUCCESS' | 'FAILED' | 'MANUAL'

export type Plant = {
  title: string
  name: string | null
  latinName: string | null
  img: string | null
  description: string | null
  lightRequirements: string | null
  temperatureRequirements: string | null
  wateringRequirements: string | null
  wateringIntervalDays: number | null
  waterStatus: WaterStatus | null
  lastWaterDate: string | null
}

export type Plants = Plant[]

export type PlantsApiResponse = Plants

export type SoilMoisture = number | null

export type SoilMoisturePlant = {
  title: string
  value: SoilMoisture
  date: WeatherDate
}

export type SoilMoisturePlants = SoilMoisturePlant[]

export type SoilMoistureApiResponse = SoilMoisturePlant[]

export type WateringApiRequest = Pick<Plant, 'title'>
