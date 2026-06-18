'use client'

import { CloudMoon, Flame } from 'lucide-react'
import {
  WeatherCard,
  WeatherCardHeader,
  WeatherCardFooter,
  UpdateInfo,
  useWeatherStore,
  safeValue,
} from '@/entities/weather'
import { NumberTicker } from '@/shared/UI/shadcn/number-ticker'

const MAX_LUX = 2000

export function LightGauge() {
  const { illumination: indoorIllumination, date } = useWeatherStore(
    state => state.indoor
  )

  const illumination = safeValue(
    indoorIllumination && (indoorIllumination / MAX_LUX) * 100
  )

  return (
    <WeatherCard colors={['#facc15', '#f59e0b']}>
      <WeatherCardHeader
        title={'Уровень освещения'}
        mode={'home'}
        availableModes={['home']}
        onMode={() => {}}
      />

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
                stroke="lab(96.1596% -.0823438 -1.13575)"
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
                strokeDashoffset={100 - illumination}
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
              <div className="text-8xl text-foreground font-semibold tracking-tighter leading-none select-none">
                <NumberTicker
                  value={illumination}
                  className="text-8xl text-foreground font-semibold tracking-tighter whitespace-pre-wrap leading-none select-none"
                />
                %
              </div>
            </div>
          </div>

          <div className="flex justify-between gap-4 min-w-[366px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <CloudMoon className="w-4 h-4" />
              <p className="text-sm tracking-wide leading-none select-none">
                Пещера
              </p>
            </div>
            <div className="flex items-center gap-2 text-[#f59e0b]">
              <p className="text-sm tracking-wide leading-none select-none">
                Крематорий
              </p>
              <Flame className="w-4 h-4" />
            </div>
          </div>
        </div>
      </WeatherCardFooter>

      <UpdateInfo date={date} />
    </WeatherCard>
  )
}
