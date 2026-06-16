'use client'

import { useState, useMemo } from 'react'
import { Droplet, Flame } from 'lucide-react'
import {
  WeatherCard,
  WeatherCardHeader,
  WeatherCardContent,
  WeatherCardFooter,
  type Mode,
  useWeatherStore,
  safeValue,
} from '@/entities/weather'

export const HumidityBar = () => {
  const { humidity: indoorHumidity, date: indoorDate } = useWeatherStore(
    state => state.indoor
  )
  const { humidity: outdoorHumidity, time: outdoorTime } = useWeatherStore(
    state => state.outdoor
  )

  const [mode, setMode] = useState<Mode>('home')

  const { humidity, date } = useMemo(() => {
    if (mode === 'home') {
      return { humidity: safeValue(indoorHumidity), date: indoorDate }
    } else {
      return { humidity: safeValue(outdoorHumidity), date: outdoorTime }
    }
  }, [mode, indoorHumidity, indoorDate, outdoorHumidity, outdoorTime])

  return (
    <WeatherCard colors={['#1e90ff', '#87ceeb']}>
      <WeatherCardHeader title={'Влажность'} mode={mode} onMode={setMode} />

      <WeatherCardContent
        value={humidity}
        unit={'%'}
        otherValues={mode === 'home' ? null : { humidity }}
        date={date}
      />

      <WeatherCardFooter>
        <div className="relative w-full h-16 bg-gray-100 rounded-xl overflow-hidden">
          <div
            className="absolute h-full bg-sky-300 transition-width duration-300 ease-out"
            style={{ width: `${humidity}%` }}
          />
        </div>

        <div className="flex justify-between gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4" />
            <p className="text-sm tracking-wide leading-none select-none">
              Сухо
            </p>
          </div>
          <div className="flex items-center gap-2 text-sky-300">
            <Droplet className="w-4 h-4" />
            <p className="text-sm text-sky-300 tracking-wide leading-none select-none">
              Влажно
            </p>
          </div>
        </div>
      </WeatherCardFooter>
    </WeatherCard>
  )
}
