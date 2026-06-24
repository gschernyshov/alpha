import { DateTime } from 'luxon'
import { type NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/shared/db/prisma'
import { sendTelegramMessage } from '@/shared/lib/telegram'

type Plant = {
  title: string
  soilMoisture: string
}

type Plants = Plant[]

const API_KEY = process.env.API_KEY

export const sensor = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const xApiKey = request.headers.get('x-api-key')
    if (xApiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams

    const tempParam = searchParams.get('temp')
    const humParam = searchParams.get('hum')
    const illumParam = searchParams.get('illum')
    const plantsParam = searchParams.get('plants')
    const measuredParam = searchParams.get('measured')

    if (
      !tempParam ||
      !humParam ||
      !illumParam ||
      !plantsParam ||
      !measuredParam
    ) {
      return NextResponse.json(
        {
          error:
            'Missing required parameters: temp, hum, illum, plants, measured',
        },
        { status: 400 }
      )
    }

    const temperature = parseFloat(tempParam)
    const humidity = parseFloat(humParam)
    const illumination = parseFloat(illumParam)

    if (isNaN(temperature) || isNaN(humidity) || isNaN(illumination)) {
      return NextResponse.json(
        {
          error: 'Invalid numeric values for temp, hum, or illum',
        },
        { status: 400 }
      )
    }

    let plants: Plants
    try {
      plants = JSON.parse(plantsParam)
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in plants' },
        { status: 400 }
      )
    }

    for (const plant of plants) {
      const soilMoisture = parseFloat(plant.soilMoisture)

      if (isNaN(soilMoisture)) {
        return NextResponse.json(
          {
            error: 'Invalid numeric values for soil moisture in plants',
          },
          { status: 400 }
        )
      }
    }

    const measured = DateTime.fromISO(measuredParam)

    if (!measured.isValid) {
      return NextResponse.json(
        { error: 'Invalid date format for measured' },
        { status: 400 }
      )
    }

    const measuredISO = measured.toISO()

    try {
      await prisma.weather.create({
        data: {
          temperature,
          humidity,
          illumination,
          measuredAt: measuredISO,
        },
      })
    } catch (error) {
      console.warn(
        'Ошибка добавления данных метеостанции в БД (Prisma ORM): ',
        error
      )

      throw error
    }

    for (const plant of plants) {
      const title = plant.title
      const soilMoisture = parseFloat(plant.soilMoisture)

      try {
        const { id } = (await prisma.plant.findUnique({
          where: { title },
          select: { id: true },
        })) || { id: null }

        if (!id) {
          console.warn(
            `Растение "${title}" не найдено в БД. Запись влажности почвы в БД почвы пропущена`
          )
          continue
        }

        await prisma.soilMoisture.create({
          data: {
            plantId: id,
            value: soilMoisture,
            measuredAt: measuredISO,
          },
        })
      } catch (error) {
        console.warn(
          `Ошибка добавления данных влажности почвы в БД для "${title}": `,
          error
        )

        throw error
      }
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
