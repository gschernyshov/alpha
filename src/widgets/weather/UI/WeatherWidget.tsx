'use client'

import { TemperatureBar, HumidityBar, LightGauge } from '@/src/features/weather'

export const WeatherWidget = () => {
  return (
    <div className="flex flex-col gap-10 w-xl p-5 bg-yellow-100">
      <TemperatureBar />
      <HumidityBar />
      <LightGauge />
    </div>
  )
}
