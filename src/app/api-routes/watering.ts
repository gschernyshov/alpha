import { type NextRequest, NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import { prisma } from '@/shared/db/prisma'
import { WaterStatus } from '@/shared/db/generated/prisma/enums'
import { stationClient } from '@/shared/api'
import { sendTelegramMessage } from '@/shared/lib/telegram'

const STATION_API_KEY = process.env.STATION_API_KEY
const WATERING_MODE = process.env.WATERING_MODE
const WATERING_EARLY_ACCESS_DAYS = Number(
  process.env.NEXT_PUBLIC_WATERING_EARLY_ACCESS_DAYS || '2'
)

type StartWateringRequest = {
  title: string
}

export const startWatering = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    const body: StartWateringRequest = await request.json()

    const { title } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Требуется title растения' },
        { status: 400 }
      )
    }

    const plant = await prisma.plant.findUnique({
      where: { title },
      select: {
        id: true,
        title: true,
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
        { error: `Растение ${title} не найдено` },
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

    const plants =
      WATERING_MODE === 'ONE'
        ? [{ id: plant.id, title: plant.title }]
        : await prisma.plant.findMany({
            select: { id: true, title: true },
          })
    const plantMap = new Map(plants.map(plant => [plant.id, plant.title]))

    const waterData = await prisma.$transaction(async tx => {
      const batchId = crypto.randomUUID()

      const waterLogData = plants.map(plant => ({
        batchId,
        plantId: plant.id,
        status: WaterStatus.PENDING,
      }))

      await tx.waterLog.createMany({
        data: waterLogData,
      })

      const waterLogs = await tx.waterLog.findMany({
        where: {
          batchId,
        },
        select: { id: true, plantId: true },
      })

      return waterLogs.map(waterLog => ({
        plant: plantMap.get(waterLog.plantId),
        waterLog: waterLog.id,
      }))
    })

    try {
      await stationClient.post('/watering', {
        title,
        waterData,
      })
    } catch {
      const waterLogs = waterData.map(item => item.waterLog)
      await prisma.waterLog.updateMany({
        where: { id: { in: waterLogs } },
        data: {
          status: WaterStatus.FAILED,
          waterAt: DateTime.utc().toISO(),
        },
      })

      const errorMsg =
        WATERING_MODE === 'ONE'
          ? `При попытке полива растения ${title} возникла ошибка`
          : `Ошибка при массовом поливе растений. Обновлено ${waterLogs.length} задач.`

      try {
        await sendTelegramMessage(errorMsg)
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

type ConfirmWateringRequest = {
  plants?: string[]
  waterLogs?: number[]
}

export const confirmWatering = async (
  request: NextRequest
): Promise<NextResponse> => {
  try {
    const xApiKey = request.headers.get('X-API-Key')
    if (xApiKey !== STATION_API_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body: ConfirmWateringRequest = await request.json()

    const { plants, waterLogs } = body

    if (!plants && !waterLogs) {
      return NextResponse.json(
        { error: 'Missing required fields: plants or waterLogs' },
        { status: 400 }
      )
    }

    if (plants) {
      if (Array.isArray(plants) && plants.length !== 0) {
        if (plants.some(title => typeof title !== 'string')) {
          return NextResponse.json(
            { error: 'All items in plants must be strings' },
            { status: 400 }
          )
        }
      } else {
        return NextResponse.json(
          { error: 'Must be an array for plants' },
          { status: 400 }
        )
      }
    }

    if (waterLogs) {
      if (Array.isArray(waterLogs) && waterLogs.length !== 0) {
        if (waterLogs.some(id => !Number.isInteger(id) || id <= 0)) {
          return NextResponse.json(
            { error: 'All items in waterLogs must be positive integers' },
            { status: 400 }
          )
        }
      } else {
        return NextResponse.json(
          { error: 'Must be an array for waterLogs' },
          { status: 400 }
        )
      }
    }

    await prisma.$transaction(async tx => {
      if (plants) {
        for (const title of plants) {
          const plant = await tx.plant.findUnique({
            where: { title },
          })

          if (!plant) {
            throw new Error(`Plant ${title} not found`)
          }

          await tx.waterLog.create({
            data: {
              plantId: plant.id,
              status: WaterStatus.MANUAL,
              waterAt: DateTime.utc().toISO(),
            },
          })
        }
      }

      if (waterLogs) {
        for (const id of waterLogs) {
          const existing = await tx.waterLog.findUnique({
            where: { id },
          })

          if (!existing) {
            throw new Error(`WaterLog with id ${id} not found`)
          }

          await tx.waterLog.update({
            where: { id },
            data: {
              status: WaterStatus.SUCCESS,
              waterAt: DateTime.utc().toISO(),
            },
          })
        }
      }
    })

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
