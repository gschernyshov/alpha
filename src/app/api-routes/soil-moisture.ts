import { NextResponse } from 'next/server'
import { DateTime } from 'luxon'
import { prisma } from '@/shared/db/prisma'

type SoilMoistureResult = {
  title: string
  value: number | null
  date: string | null
}[]

export const soilMoisture = async (): Promise<NextResponse> => {
  try {
    const plants = await prisma.plant.findMany({
      select: {
        title: true,
        soilMoistures: {
          select: {
            value: true,
            measuredAt: true,
          },
          orderBy: {
            measuredAt: 'desc',
          },
          take: 1,
        },
      },
    })

    const result: SoilMoistureResult = plants.map(
      ({ title, soilMoistures }) => ({
        title,
        value: soilMoistures[0]?.value ?? null,
        date: soilMoistures[0]?.measuredAt
          ? DateTime.fromJSDate(soilMoistures[0].measuredAt).toISO()
          : null,
      })
    )

    return NextResponse.json(result)
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
