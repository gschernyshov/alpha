import { type NextRequest, NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import { prisma } from '@/shared/db/prisma'
import { WaterStatus } from '@/shared/db/generated/prisma/enums'
import { stationClient } from '@/shared/api'

const API_KEY = process.env.API_KEY

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
    })

    if (!plant) {
      return NextResponse.json(
        { error: `Растение "${title}" не найдено` },
        { status: 404 }
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
        data: { status: WaterStatus.FAILED },
      })
    }

    return NextResponse.json(null, { status: 204 })
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
    const xApiKey = request.headers.get('x-api-key')
    if (xApiKey !== API_KEY) {
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

    return NextResponse.json(null, { status: 204 })
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
