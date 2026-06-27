import { WeatherDate } from '@/entities/weather'

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
