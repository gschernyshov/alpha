import { NextResponse } from 'next/server'

export const weather = async () => {
  const mockData = {
    temperature: +(Math.random() * 30).toFixed(1),
    humidity: Math.floor(Math.random() * 100),
    illumination: Math.floor(Math.random() * 1000),
  }

  return NextResponse.json(mockData)
}
