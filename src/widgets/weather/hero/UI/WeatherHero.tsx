'use client'

import { WeatherFeatures } from './WeatherFeatures'
import {
  DataStatus,
  StationStatus,
  ViewModeToggle,
  useViewModeStore,
} from '@/features/weather'
import { ShineBorder } from '@/shared/UI/shadcn/shine-border'
import { Badge } from '@/shared/UI/shadcn/badge'
import { Globe } from '@/shared/UI/shadcn/globe'

export const WeatherHero = () => {
  const { viewMode } = useViewModeStore()

  if (viewMode === 'compact')
    return (
      <div className="flex flex-start font-mono">
        <ViewModeToggle />
      </div>
    )

  return (
    <section className="relative p-10 bg-gradient-to-b from-zinc-950 to-black rounded-3xl shadow-xl md:shadow-2xl dark:shadow-xs dark:shadow-foreground font-mono">
      <ShineBorder
        duration={10}
        shineColor={[
          'lab(67.805% -35.3952 -30.2018)',
          'lab(54.1736% 13.3369 -74.6839)',
          'lab(64.272% 57.1788 90.3583)',
        ]}
      />
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-start gap-10 md:gap-20">
          <div className="flex gap-2 flex-wrap">
            <Badge className="p-3 bg-cyan-500/10 border-cyan-500/30 text-cyan-300">
              Arduino Leonardo
            </Badge>
            <Badge className="p-3 bg-blue-500/10 border-blue-500/30 text-blue-300">
              ESP8266
            </Badge>
            <Badge className="p-3 bg-orange-500/10 border-orange-500/30 text-orange-300">
              OpenWeather API
            </Badge>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-4xl md:text-5xl text-white font-bold leading-tight">
              Домашняя
              <br />
              Метеостанция
            </h2>

            <p className="max-w-xl text-sm md:text-md text-zinc-400">
              Самодельная IoT-система для мониторинга климата. Данные поступают
              с датчиков, подключенных к Arduino Leonardo и передаются через
              ESP8266. Для получения глобального контекста — текущей погоды в
              городе — используется OpenWeather API.
            </p>

            <WeatherFeatures />
          </div>

          <ViewModeToggle classNames="hidden md:flex" />
        </div>

        <div className="relative h-100 md:h-full">
          <DataStatus className="absolute left-0 top-5" />

          <Globe />

          <StationStatus className="absolute right-0 bottom-5" />
        </div>
      </div>
    </section>
  )
}
