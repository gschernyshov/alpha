import { type NextRequest, NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import { prisma } from '@/shared/db/prisma'
import { sendTelegramMessage } from '@/shared/lib/telegram'

const API_KEY = process.env.API_KEY

export const sensor = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const xApiKey = request.headers.get('x-api-key')
    if (xApiKey !== API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const { temperature, humidity, illumination, plants, measured } = body

    if (!temperature || !humidity || !illumination || !plants || !measured) {
      return NextResponse.json(
        {
          error:
            'Missing required fields: temperature, humidity, illumination, plants, or measured',
        },
        { status: 400 }
      )
    }

    if (
      !Number.isFinite(temperature) ||
      !Number.isFinite(humidity) ||
      !Number.isFinite(illumination)
    ) {
      return NextResponse.json(
        {
          error:
            'Invalid numeric values for temperature, humidity, or illumination',
        },
        { status: 400 }
      )
    }

    if (!Array.isArray(plants)) {
      return NextResponse.json(
        { error: 'An array is required for plants' },
        { status: 400 }
      )
    }

    for (const plant of plants) {
      if (
        typeof plant.title !== 'string' ||
        !Number.isFinite(plant.soilMoisture)
      ) {
        return NextResponse.json(
          {
            error: 'Invalid plant data',
          },
          { status: 400 }
        )
      }
    }

    const measuredDate = DateTime.fromISO(measured)

    if (!measuredDate.isValid) {
      return NextResponse.json(
        { error: 'Invalid date format for measured' },
        { status: 400 }
      )
    }

    const measuredISO = measuredDate.toISO()

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
      console.warn('Ошибка добавления данных метеостанции в БД: ', error)

      throw error
    }

    for (const plant of plants) {
      const { title, soilMoisture } = plant

      try {
        const { id } = (await prisma.plant.findUnique({
          where: { title },
          select: { id: true },
        })) || { id: null }

        if (!id) {
          console.warn(
            `Растение "${title}" не найдено в БД. Запись влажности почвы в БД пропущена`
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

    return NextResponse.json(null, { status: 204 })
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
