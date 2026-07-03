'use client'

import { useMemo } from 'react'
import { WateringPlant } from './WateringPlant'
import { WateringTitle } from './WateringTilte'
import { WateringTabs } from './WateringTabs'
import { WateringAction } from './WateringAction'
import { useModeStore } from '../model/modeStore'
import type { Plant, Plants } from '../model/types'
import { getMode, getAvailableModes } from '../lib/getMode'
import { ANCHOR_WATERING } from '../config/anchor'
import { WeatherCard, WeatherCardHeader } from '@/entities/weather'

interface WateringInfoProps {
  plants: Plants
}

export const WateringInfo = ({ plants }: WateringInfoProps) => {
  const { mode, setMode } = useModeStore()

  const plantsMap = useMemo(() => {
    return new Map(plants.map(plant => [plant.title, plant]))
  }, [plants])

  const plantFirst: Plant | undefined = plants[0]

  const plant: Plant | undefined = useMemo(() => {
    if (mode && plantsMap.has(mode.label)) {
      return plantsMap.get(mode.label)!
    }
    return plantFirst
  }, [mode, plantsMap, plantFirst])

  const currentMode = mode ?? getMode(plant.title)

  const availableModes = useMemo(() => {
    return getAvailableModes(plants.map(plant => plant.title))
  }, [plants])

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
        mode={currentMode}
        availableModes={availableModes}
        onMode={setMode}
      />
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4 h-full">
        <WateringPlant title={plant.title} img={plant.img} />
        <div className="flex flex-col justify-between items-start gap-8 h-full">
          <WateringTitle
            title={plant.title}
            name={plant.name}
            latinName={plant.latinName}
          />
          <WateringTabs plant={plant} />
          <WateringAction plant={plant} />
        </div>
      </div>
    </WeatherCard>
  )
}
