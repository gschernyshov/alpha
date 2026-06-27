import { NextResponse } from 'next/server'
import { stationClient } from '@/shared/api'

export const statusStation = async (): Promise<NextResponse> => {
  try {
    await stationClient.get('/status')

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Внутренняя ошибка сервера: ', error)

    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    )
  }
}
