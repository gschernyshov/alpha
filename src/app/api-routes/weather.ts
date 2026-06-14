import { NextResponse } from 'next/server'
import prisma from '@/shared/db/prisma'

export const weather = async () => {
  try {
    const latestWeather = await prisma.weather.findFirst({
      orderBy: { createdAt: 'desc' },
    })

    if (!latestWeather) {
      return NextResponse.json(
        { error: 'Данные о погоде не найдены' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      temperature: latestWeather.temperature,
      humidity: latestWeather.humidity,
      illumination: latestWeather.illumination,
      date: latestWeather.createdAt,
    })
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
