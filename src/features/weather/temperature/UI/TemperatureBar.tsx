'use client'

import { useState, useMemo } from 'react'
import { moods } from '../model/mood'
import {
  WeatherCard,
  WeatherCardHeader,
  WeatherCardContent,
  WeatherCardFooter,
  convertTemp,
  type Mode,
  useWeatherStore,
  safeValue,
} from '@/entities/weather'

export const TemperatureBar = () => {
  const { temperature: indoorTemp, date: indoorDate } = useWeatherStore(
    state => state.indoor
  )
  const {
    temp: outdoorTemp,
    time: outdoorTime,
    feelsLike,
    pressure,
    windSpeed,
  } = useWeatherStore(state => state.outdoor)

  const [mode, setMode] = useState<Mode>('home')
  const [unit, setUnit] = useState<'C' | 'F' | 'K'>('C')

  const { temperature, date } = useMemo(() => {
    if (mode === 'home') {
      return { temperature: indoorTemp ?? 0, date: indoorDate }
    } else {
      return { temperature: outdoorTemp ?? 0, date: outdoorTime }
    }
  }, [mode, indoorTemp, indoorDate, outdoorTemp, outdoorTime])

  const { minTemp, maxTemp } = useMemo(() => {
    if (moods.length === 0)
      return {
        minTemp: 0,
        maxTemp: 0,
      }

    const minTemps = moods.map(mood => mood.minTemp ?? 0)
    const maxTemps = moods.map(mood => mood.maxTemp ?? 0)

    return {
      minTemp: Math.min(...minTemps),
      maxTemp: Math.max(...maxTemps),
    }
  }, [])

  const percent = useMemo(() => {
    if (minTemp === maxTemp) return 0

    return safeValue(((temperature - minTemp) / (maxTemp - minTemp)) * 100)
  }, [temperature, minTemp, maxTemp])

  const gradient = useMemo(() => {
    if (minTemp === maxTemp)
      return `linear-gradient(90deg, #ffa500 0%, #ff4500 100%)`

    const stops: string[] = []

    moods.forEach(mood => {
      const pos = ((mood.minTemp - minTemp) / (maxTemp - minTemp)) * 100

      stops.push(`${mood.color} ${pos}%`)
    })

    return `linear-gradient(90deg, ${stops.join(', ')})`
  }, [minTemp, maxTemp])

  const toggleUnit = () => {
    setUnit(prev => (prev === 'C' ? 'K' : prev === 'K' ? 'F' : 'C'))
  }

  return (
    <>
      <style>
        {`
          @keyframes hueShift {
            0% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(20deg); }
            100% { filter: hue-rotate(0deg); } 
          }
        `}
      </style>

      <WeatherCard colors={['#1e90ff', '#87ceeb', '#ffa500', '#ff4500']}>
        <WeatherCardHeader
          title={'Температура'}
          mode={mode}
          availableModes={['home', 'city']}
          onMode={setMode}
        />

        <WeatherCardContent
          value={convertTemp(temperature, unit)}
          unit={unit === 'C' ? '°C' : unit === 'F' ? '°F' : 'K'}
          onUnit={toggleUnit}
          otherValues={
            mode === 'home' ? null : { feelsLike, pressure, windSpeed }
          }
          date={date}
        />

        <WeatherCardFooter>
          <div
            className="flex justify-center h-3 rounded-full"
            style={{
              background: gradient,
              animation: 'hueShift 3s ease-in-out infinite',
            }}
          >
            <div className="relative w-[calc(100%-10px)] h-full">
              <div
                className="
                  absolute top-1/2
                  -translate-x-1/2 -translate-y-1/2 
                  h-8 w-[2.2px] bg-black rounded-full
                  transition-left duration-500 ease-out
                "
                style={{
                  left: `${percent}%`,
                }}
              />
            </div>
          </div>

          <div className="flex justify-between gap-4 text-muted-foreground">
            {moods.map(mood => (
              <div key={mood.label} className="flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 bg-black rounded-full"
                  style={{ background: mood.color }}
                />

                <p className="text-sm tracking-wide leading-none select-none">
                  {mood.label}
                </p>
              </div>
            ))}
          </div>
        </WeatherCardFooter>
      </WeatherCard>
    </>
  )
}
