import { type NextRequest, NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import { prisma } from '@/shared/db/prisma'
import { WaterStatus } from '@/shared/db/generated/prisma/enums'
import { stationClient } from '@/shared/api'
import { sendTelegramMessage } from '@/shared/lib/telegram'

const STATION_API_KEY = process.env.STATION_API_KEY
const WATERING_EARLY_ACCESS_DAYS = parseInt(
  process.env.NEXT_PUBLIC_WATERING_EARLY_ACCESS_DAYS || '2',
  10
)

export const startWatering = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    const body = await request.json()

    const { title } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Требуется "title" растения' },
        { status: 400 }
      )
    }

    const plant = await prisma.plant.findUnique({
      where: { title },
      select: {
        id: true,
        profile: {
          select: {
            wateringIntervalDays: true,
          },
        },
        waterLogs: {
          select: {
            waterAt: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
          take: 1,
        },
      },
    })

    if (!plant) {
      return NextResponse.json(
        { error: `Растение "${title}" не найдено` },
        { status: 404 }
      )
    }

    if (!plant?.waterLogs[0]?.waterAt) {
      return NextResponse.json(
        { error: 'Невозможно определить дату последнего полива' },
        { status: 400 }
      )
    }

    const lastWatering = DateTime.fromJSDate(plant.waterLogs[0].waterAt).toUTC()
    const nextWatering = lastWatering.plus({
      days: plant.profile?.wateringIntervalDays,
    })
    const now = DateTime.now().toUTC()
    const diffWatering = Math.round(nextWatering.diff(now).as('days') * 10) / 10

    if (diffWatering > WATERING_EARLY_ACCESS_DAYS) {
      return NextResponse.json(
        {
          error: `Полив разрешён не ранее чем за ${WATERING_EARLY_ACCESS_DAYS} дня до запланированного полива`,
        },
        { status: 403 }
      )
    }

    const waterLog = await prisma.waterLog.create({
      data: {
        plantId: plant.id,
        status: WaterStatus.PENDING,
      },
    })

    try {
      await stationClient.post('/watering', {
        title,
        waterLog: waterLog.id,
      })
    } catch {
      await prisma.waterLog.update({
        where: { id: waterLog.id },
        data: { status: WaterStatus.FAILED, waterAt: DateTime.utc().toISO() },
      })

      try {
        await sendTelegramMessage(
          `При попытке полива растения ${title} возникла ошибка`
        )
      } catch (error) {
        console.warn('Ошибка отправки сообщения в Telegram: ', error)
      }
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}

export const confirmWatering = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    const xApiKey = request.headers.get('X-API-Key')
    if (xApiKey !== STATION_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const { title, waterLog } = body

    if (!title && !waterLog) {
      return NextResponse.json(
        { error: 'Missing required fields: title, or waterLog' },
        { status: 400 }
      )
    }

    if (title && typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Must be a string for "title"' },
        { status: 400 }
      )
    }

    if (waterLog && !Number.isFinite(waterLog)) {
      return NextResponse.json(
        { error: 'Must be a number for "waterLog"' },
        { status: 400 }
      )
    }

    if (title && !waterLog) {
      const plant = await prisma.plant.findUnique({
        where: { title },
      })

      if (!plant) {
        return NextResponse.json(
          { error: `Plant "${title}" not found` },
          { status: 404 }
        )
      }

      await prisma.waterLog.create({
        data: {
          plantId: plant.id,
          status: WaterStatus.MANUAL,
          waterAt: DateTime.utc().toISO(),
        },
      })
    }

    if (waterLog && !title) {
      await prisma.waterLog.update({
        where: { id: waterLog },
        data: { status: WaterStatus.SUCCESS, waterAt: DateTime.utc().toISO() },
      })
    }

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
