'use client'

import Image from 'next/image'
import { useState, useMemo } from 'react'
import { DateTime } from 'luxon'
import { Droplet } from 'lucide-react'
import { useModeStore } from '../model/modeStore'
import { useSoilMoisturePlantsStore } from '../model/soilMoisturePlantsStore'
import type { Plant, Plants } from '../model/types'
import { ANCHOR_WATERING } from '../config/anchor'
import { getMode, getAvailableModes } from '../lib/getMode'
import { getWateringInfo } from '../lib/getWateringInfo'
import { getPluralizeDays } from '../lib/getPluralizeDays'
import { getHumidityColor } from '../lib/getHumidityColor'
import { WeatherCard, WeatherCardHeader } from '@/entities/weather'
import { Button } from '@/shared/UI/shadcn/button'
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/shared/UI/shadcn/tabs'
import { AlertMessage } from '@/shared/UI/AlertMessage'
import { ExpandableTextSection } from '@/shared/UI/ExpandableTextSection'

interface WateringInfoProps {
  plants: Plants
}

export const WateringInfo = ({ plants }: WateringInfoProps) => {
  const { mode, setMode } = useModeStore()
  const { soilMoisturePlants } = useSoilMoisturePlantsStore()
  const [isShowLastWaterDate, setIsShowLastWaterDate] = useState(false)

  const plantFirst: Plant | undefined = plants[0]

  const plantsMap = useMemo(() => {
    return new Map(plants.map(plant => [plant.title, plant]))
  }, [plants])

  const plant: Plant | undefined = useMemo(() => {
    if (mode && plantsMap.has(mode.label)) {
      return plantsMap.get(mode.label)!
    }
    return plantFirst
  }, [mode, plantFirst, plantsMap])

  const plantSections = useMemo(() => {
    return (
      [
        {
          value: 'description',
          label: 'Описание',
        },
        {
          value: 'lightRequirements',
          label: 'Свет',
        },
        {
          value: 'temperatureRequirements',
          label: 'Температура',
        },
        {
          value: 'wateringRequirements',
          label: 'Полив',
        },
      ] as const
    ).map(({ value, label }) => ({
      value,
      label,
      content: plant?.[value] ?? 'Данные отсутствуют',
    }))
  }, [plant])

  const { nextWatering, toWatering, diffWatering } = getWateringInfo(
    plant?.lastWaterDate,
    plant?.wateringIntervalDays
  )

  const soilMoisturePlant = useMemo(() => {
    return soilMoisturePlants.find(
      soilMoisturePlant => soilMoisturePlant.title === plant?.title
    )
  }, [soilMoisturePlants, plant?.title])

  if (plants.length === 0 || !plant) {
    return null
  }

  return (
    <WeatherCard
      id={ANCHOR_WATERING}
      colors={['#9CAF88', '#B7C9B2', '#8A9A8B']}
      classNames="w-full bg-gradient-to-br from-[#E9F5E9] via-[#E0F2E1] to-[#D4E7D6] dark:from-slate-800 dark:via-slate-700 dark:to-slate-700"
    >
      <WeatherCardHeader
        title={'Автополив'}
        mode={mode ?? getMode(plant.title)}
        availableModes={getAvailableModes(plants.map(plant => plant.title))}
        onMode={setMode}
      />

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 h-full">
        <div className=" relative min-w-full md:min-w-[400px] min-h-[200px] md:pt-10">
          <Image
            alt="Изображение растения"
            src={`/plants/${plant.img}`}
            height={2}
            width={400}
            sizes="(max-width: 768px) 300px, 400px"
            className="w-full h-auto object-cover max-w-[400px] mx-auto mb-4"
          />

          <div
            className="absolute bottom-4 md:bottom-9 right-10 md:left-20 md:right-auto flex flex-col gap-1.5 rounded-lg bg-black/30 backdrop-blur-sm px-2 py-1.5 text-white shadow-md select-none cursor-pointer"
            onClick={() =>
              plant.lastWaterDate && setIsShowLastWaterDate(prev => !prev)
            }
          >
            <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
              Влажность почвы
            </span>

            <div className="flex items-center gap-1.5">
              <Droplet
                className="h-4 w-4 shrink-0"
                style={{
                  color: getHumidityColor(soilMoisturePlant?.value ?? null),
                  fill: 'currentColor',
                }}
              />
              <span className="font-semibold text-sm">
                {soilMoisturePlant?.value ?? 0}%
              </span>
            </div>

            {plant.lastWaterDate && isShowLastWaterDate && (
              <div className="text-xs tracking-wide opacity-80">
                Обновлено{' '}
                {DateTime.fromISO(plant.lastWaterDate).toRelative({
                  base: DateTime.now(),
                  locale: 'ru',
                })}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between items-start gap-8 h-full">
          <div className="flex flex-col gap-2">
            <span className="text-4xl font-semibold">{plant.title}</span>
            {plant.name && (
              <p className="text-md">
                {plant.name}
                {plant.latinName && (
                  <span className="text-muted-foreground">
                    {' '}
                    ({plant.latinName})
                  </span>
                )}
              </p>
            )}
          </div>

          <Tabs
            defaultValue="description"
            className="flex flex-col gap-4 w-full"
          >
            <TabsList className="flex justify-start flex-wrap gap-1.5 h-auto! p-0 md:p-1 bg-white/0 md:bg-emerald-50 dark:bg-slate-800 rounded-lg">
              {plantSections.map(({ value, label }) => (
                <TabsTrigger
                  key={value}
                  value={value}
                  defaultValue={'description'}
                  className={`
                    flex-[0_0_auto]
                    px-3 py-1.5 rounded-md text-sm font-medium
                    bg-emerald-100 hover:bg-emerald-200
                    text-emerald-700 hover:text-emerald-800
                    data-[state=active]:bg-emerald-600 data-[state=active]:hover:bg-emerald-600
                    data-[state=active]:text-white data-[state=active]:hover:text-white
                    cursor-pointer
                `}
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            {plantSections.map(({ value, content }) => (
              <TabsContent key={value} value={value}>
                <ExpandableTextSection className="text-sm text-muted-foreground">
                  {content}
                </ExpandableTextSection>
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex flex-row items-center justify-between md:justify-start gap-4 md:gap-15 w-full">
            <div
              className={`flex flex-col gap-4 md:gap-2 ${diffWatering === null ? 'text-black' : diffWatering >= 0 ? 'text-black' : 'text-red-400'}`}
            >
              <span className="text-md font-semibold">
                {diffWatering === null
                  ? 'Следующий полив через'
                  : diffWatering >= 0
                    ? 'Следующий полив через'
                    : 'Полив пропущен'}
              </span>

              <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4">
                <span className="text-4xl font-bold">
                  {toWatering ?? '? дня'}
                </span>

                {nextWatering && (
                  <span className="text-sm text-muted-foreground font-medium">
                    {nextWatering}
                  </span>
                )}
              </div>

              <div className="mt-1 text-xs md:text-sm text-muted-foreground">
                <span className="font-medium">
                  полив каждые {getPluralizeDays(plant.wateringIntervalDays)}
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              disabled={
                diffWatering !== null && diffWatering <= 2 ? false : true
              }
              aria-label="Полить растение"
              className="h-27 w-14 md:w-27 shrink-0 rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-md text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-white focus:ring-2 focus:ring-emerald-100"
            >
              <Droplet className="h-8 w-8" />
            </Button>
          </div>

          <AlertMessage
            title="Ручной полив"
            message={`Кнопка ручного полива станет доступна за 2 дня до следующего полива. До ${nextWatering ?? '?'} вы сможете полить растение самостоятельно и отменить автоматический полив.`}
          />
        </div>
      </div>
    </WeatherCard>
  )
}
