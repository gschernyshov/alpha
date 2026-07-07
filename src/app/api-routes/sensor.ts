import { type NextRequest, NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import { prisma } from '@/shared/db/prisma'
import { sendTelegramMessage } from '@/shared/lib/telegram'

const STATION_API_KEY = process.env.STATION_API_KEY

type Plant = {
  title: string
  soilMoisture: number
}

type SensorRequest = {
  temperature: number
  humidity: number
  illumination: number
  plants: Plant[]
  measured: string
}

export const sensor = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const xApiKey = request.headers.get('X-API-Key')
    if (xApiKey !== STATION_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: SensorRequest = await request.json()

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

    const measuredISO = measuredDate.toUTC().toISO()

    try {
      await prisma.$transaction(async tx => {
        await tx.weather.create({
          data: {
            temperature,
            humidity,
            illumination,
            measuredAt: measuredISO,
          },
        })

        for (const plant of plants) {
          const { title, soilMoisture } = plant

          const { id } = (await prisma.plant.findUnique({
            where: { title },
            select: { id: true },
          })) || { id: null }

          if (!id) {
            console.warn(
              `Растение ${title} не найдено в БД. Запись влажности почвы в БД пропущена`
            )
            throw new Error(`Plant ${title} not found`)
          }

          await tx.soilMoisture.create({
            data: {
              plantId: id,
              value: soilMoisture,
              measuredAt: measuredISO,
            },
          })
        }
      })
    } catch (error) {
      console.warn(
        'Ошибка сохранения данных с сенсоров и датчиков в БД: ',
        error
      )
      throw error
    }

    try {
      await sendTelegramMessage(
        [
          `Температура: ${temperature.toFixed(1)} °C`,
          `Влажность: ${Math.min(100, Math.max(0, humidity)).toFixed(1)} %`,
          `Уровень освещения: ${Math.min(100, Math.max(0, (illumination / 750) * 100)).toFixed(1)} %`,
          plants.length > 0
            ? 'Влажность почвы растений:\n' +
              plants
                .map(
                  plant =>
                    `${plant.title}: ${Math.min(100, Math.max(0, (plant.soilMoisture / 750) * 100)).toFixed(1)} %`
                )
                .join('\n')
            : '',
          `\nДата считывания данных с сенсоров и датчиков: ${measured}`,
        ].join('\n')
      )
    } catch (error) {
      console.warn('Ошибка отправки сообщения в Telegram: ', error)
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    const isNotFoundError =
      error instanceof Error && error.message.includes('not found')

    const message =
      error instanceof Error ? error.message : 'Internal server error'
    const status = isNotFoundError ? 404 : 500

    return NextResponse.json({ error: message }, { status })
  }
}
