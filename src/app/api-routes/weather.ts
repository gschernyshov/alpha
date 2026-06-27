import { DateTime } from 'luxon'
import { NextResponse } from 'next/server'
import { prisma } from '@/shared/db/prisma'
import type { Weather } from '@/shared/db/generated/prisma/client'
import { openWeatherClient } from '@/shared/api'

interface IndoorData {
  temperature: number | null
  humidity: number | null
  illumination: number | null
  date: string | null
}

interface OutdoorData {
  temp: number | null
  feelsLike: number | null
  humidity: number | null
  pressure: number | null
  windSpeed: number | null
  time: string | null
}

interface WeatherResult {
  indoor: IndoorData
  outdoor: OutdoorData
}

const CITY_COORDS = {
  lat: process.env.CITY_COORDS_LAT || 55.7558,
  lon: process.env.CITY_COORDS_LON || 37.6173,
} as const

export const weather = async (): Promise<NextResponse> => {
  try {
    let latestIndoor: Weather | null = null
    try {
      latestIndoor = await prisma.weather.findFirst({
        orderBy: { createdAt: 'desc' },
      })
    } catch (error) {
      console.warn('Ошибка получения данных метеостанции из БД: ', error)
    }

    let outdoorData = null
    try {
      outdoorData = (
        await openWeatherClient.get('/weather', {
          params: { lat: CITY_COORDS.lat, lon: CITY_COORDS.lon },
        })
      ).data
    } catch (error) {
      console.warn('Ошибка получения данных погоды из OpenWeather : ', error)
    }

    if (!latestIndoor && !outdoorData) {
      return NextResponse.json(
        { error: 'Данные о погоде не найдены' },
        { status: 404 }
      )
    }

    const result: WeatherResult = {
      indoor: {
        temperature: latestIndoor?.temperature ?? null,
        humidity: latestIndoor?.humidity ?? null,
        illumination: latestIndoor?.illumination ?? null,
        date: latestIndoor?.measuredAt
          ? DateTime.fromJSDate(latestIndoor.measuredAt).toISO()
          : null,
      },
      outdoor: {
        temp: outdoorData?.main?.temp ?? null,
        feelsLike: outdoorData?.main?.feels_like ?? null,
        humidity: outdoorData?.main?.humidity ?? null,
        pressure: outdoorData?.main?.pressure ?? null,
        windSpeed: outdoorData?.wind?.speed ?? null,
        time: outdoorData?.dt
          ? DateTime.fromSeconds(outdoorData.dt).toISO()
          : null,
      },
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
