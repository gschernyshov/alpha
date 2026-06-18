'use client'

import { TemperatureBar, HumidityBar, LightGauge } from '@/features/weather'

export const WeatherWidget = () => {
  return (
    <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 w-full p-2.5 md:p-5 background">
      <TemperatureBar />
      <HumidityBar />
      <LightGauge />
    </div>
  )
}
