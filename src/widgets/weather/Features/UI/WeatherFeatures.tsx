'use client'

import {
  TemperatureBar,
  HumidityBar,
  LightGauge,
  Watering,
} from '@/features/weather'

export const WeatherFeatures = () => {
  return (
    <div className="flex flex-col gap-2.5 md:gap-5">
      <div className="flex flex-col md:flex-row gap-2.5 md:gap-5 w-full ">
        <TemperatureBar />
        <HumidityBar />
        <LightGauge />
      </div>
      <Watering />
    </div>
  )
}
