import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/db/prisma'
import { sendTelegramMessage } from '@/shared/lib/telegram'

const API_KEY = process.env.API_KEY

export const sensor = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const tempParam = searchParams.get('temp')
    const humParam = searchParams.get('hum')
    const illumParam = searchParams.get('illum')

    if (!tempParam || !humParam || !illumParam) {
      return NextResponse.json(
        { error: 'Missing parameters: temp, hum, illum are required' },
        { status: 400 }
      )
    }

    const temperature = parseFloat(tempParam)
    const humidity = parseFloat(humParam)
    const illumination = parseFloat(illumParam)

    if (isNaN(temperature) || isNaN(humidity) || isNaN(illumination)) {
      return NextResponse.json(
        { error: 'Invalid numeric values for temp, hum, illum' },
        { status: 400 }
      )
    }

    try {
      await prisma.weather.create({
        data: {
          temperature,
          humidity,
          illumination,
        },
      })
    } catch (error) {
      console.warn(
        'Ошибка добавления данных метеостанции в БД (Prisma ORM): ',
        error
      )

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    }

    try {
      await sendTelegramMessage(
        `Температура: ${temperature.toFixed(1)} °C\n` +
          `Влажность: ${Math.min(100, Math.max(0, humidity)).toFixed(1)} %\n` +
          `Уровень освещения: ${Math.min(100, Math.max(0, (illumination / 1024) * 100)).toFixed(1)} %`
      )
    } catch (error) {
      console.warn('Ошибка отправки сообщения в Telegram: ', error)
    }

    return NextResponse.json(
      { message: 'Data saved successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
