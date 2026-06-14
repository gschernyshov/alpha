'use client'

import { useState } from 'react'
import { Droplet, Flame } from 'lucide-react'
import {
  WeatherCard,
  WeatherCardHeader,
  WeatherCardContent,
  WeatherCardFooter,
  useWeatherStore,
  type Mode,
} from '@/entities/weather'
import { AlertMessage } from '@/shared/UI/AlertMessage'

export const HumidityBar = () => {
  const { value: humidity, date } = useWeatherStore(state => state.humidity)
  const [mode, setMode] = useState<Mode>('home')

  const safeHumidity = Math.min(100, Math.max(0, humidity ?? 0))

  return (
    <WeatherCard colors={['#1e90ff', '#87ceeb']}>
      <WeatherCardHeader title={'Влажность'} mode={mode} onMode={setMode} />

      {mode === 'city' ? (
        <AlertMessage message="К сожалению, данный раздел находится на этапе разработки!" />
      ) : (
        <>
          <WeatherCardContent value={humidity} date={date} unit={'%'} />

          <WeatherCardFooter>
            <div className="relative h-16 w-full bg-gray-100 rounded-xl overflow-hidden">
              <div
                className="absolute h-full bg-sky-300 transition-width duration-300 ease-out"
                style={{ width: `${safeHumidity}%` }}
              />
            </div>

            <div className="flex justify-between gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4" />
                <p className="text-sm tracking-wide leading-none select-none">
                  Сухо
                </p>
              </div>
              <div className="flex items-center gap-2 text-sky-300">
                <Droplet className="h-4 w-4" />
                <p className="text-sm text-sky-300 tracking-wide leading-none select-none">
                  Влажно
                </p>
              </div>
            </div>
          </WeatherCardFooter>
        </>
      )}
    </WeatherCard>
  )
}
