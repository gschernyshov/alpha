'use client'

import { CloudMoon, Flame } from 'lucide-react'
import {
  WeatherCard,
  WeatherCardHeader,
  WeatherCardFooter,
  UpdateInfo,
  useWeatherStore,
} from '@/entities/weather'

const MAX_LUX = 1024

export function LightGauge() {
  const { value: illumination, date } = useWeatherStore(
    state => state.illumination
  )
  const safeIllumination = illumination
    ? Math.min(100, Math.max(0, (illumination / MAX_LUX) * 100))
    : 0

  return (
    <WeatherCard colors={['#facc15', '#f59e0b']}>
      <WeatherCardHeader title={' Уровень освещения'} />

      <WeatherCardFooter>
        <div className="flex flex-col gap-2 items-center w-full">
          <div className="relative w-[360px] h-[192px]">
            <svg viewBox="0 0 360 192">
              <defs>
                <linearGradient
                  id="sunGradient"
                  x1="6"
                  y1="110"
                  x2="354"
                  y2="110"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>

              {/* Фоновая дуга */}
              <path
                d="M6 186 A174 174 0 0 1 354 186"
                fill="none"
                stroke="rgba(0, 0, 0, 0.15)"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Активная дуга */}
              <path
                d="M6 186 A174 174 0 0 1 354 186"
                fill="none"
                stroke="url(#sunGradient)"
                strokeWidth="12"
                strokeLinecap="round"
                pathLength={100}
                strokeDasharray="100"
                strokeDashoffset={100 - safeIllumination}
                className="transition-all duration-700 ease-out"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(250,204,21,.35))',
                }}
              />
            </svg>

            {/* Центральное значение */}
            <div
              className="
                absolute left-1/2 top-[112px]
                -translate-x-1/2 -translate-y-1/2
                text-center
                
              "
            >
              <div className="text-8xl text-black dark:text-white font-semibold tracking-tighter leading-none select-none">
                {Math.round(safeIllumination)}%
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 min-w-[366px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <CloudMoon className="h-4 w-4" />
              <p className="text-sm tracking-wide leading-none select-none">
                Пещера
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#f59e0b]">
              <p className="text-sm text-[#f59e0b] tracking-wide leading-none select-none">
                Крематорий
              </p>
              <Flame className="h-4 w-4" />
            </div>
          </div>
        </div>
      </WeatherCardFooter>

      <UpdateInfo date={date} />
    </WeatherCard>
  )
}
