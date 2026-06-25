import { NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import { prisma } from '@/shared/db/prisma'

type PlantsResult = {
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
}[]

export const plants = async (): Promise<NextResponse> => {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        title: true,
        profile: {
          select: {
            name: true,
            latinName: true,
            img: true,
            description: true,
            lightRequirements: true,
            temperatureRequirements: true,
            wateringRequirements: true,
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

    const result: PlantsResult = plants.map(plant => ({
      title: plant.title,
      name: plant.profile?.name ?? null,
      latinName: plant.profile?.latinName ?? null,
      img: plant.profile?.img ?? null,
      description: plant.profile?.description ?? null,
      lightRequirements: plant.profile?.lightRequirements ?? null,
      temperatureRequirements: plant.profile?.temperatureRequirements ?? null,
      wateringRequirements: plant.profile?.wateringRequirements ?? null,
      wateringIntervalDays: plant.profile?.wateringIntervalDays ?? null,
      lastWaterDate: plant.waterLogs[0]?.waterAt
        ? DateTime.fromJSDate(plant.waterLogs[0]?.waterAt).toISO()
        : null,
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
