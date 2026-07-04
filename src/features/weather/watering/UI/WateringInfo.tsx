'use client'

import { WateringPlant } from './WateringPlant'
import { WateringTitle } from './WateringTilte'
import { WateringTabs } from './WateringTabs'
import { WateringAction } from './WateringAction'
import { usePlantsStore } from '../model/plantsStore'
import { useModeStore } from '../model/modeStore'
import { usePlants } from '../model/usePlants'
import { useMode } from '../model/useMode'
import type { Plants } from '../model/types'
import { ANCHOR_WATERING } from '../config/anchor'
import { WeatherCard, WeatherCardHeader } from '@/entities/weather'

interface WateringInfoProps {
  initPlants: Plants
}

export const WateringInfo = ({ initPlants }: WateringInfoProps) => {
  const { isLoading: isLoadingPlants, plants, plant } = usePlantsStore()
  const { mode, setMode } = useModeStore()

  const { reloadPlants } = usePlants({ initPlants, mode })
  const { availableModes } = useMode({ plants, plant })

  if (plants.length === 0 || !plant) {
    return null
  }

  return (
    <WeatherCard
      id={ANCHOR_WATERING}
      isLoading={isLoadingPlants}
      colors={['#9CAF88', '#B7C9B2', '#8A9A8B']}
      classNames="w-full bg-gradient-to-br from-[#E9F5E9] via-[#E0F2E1] to-[#D4E7D6] dark:from-slate-800 dark:via-slate-700 dark:to-slate-700 select-none"
    >
      <WeatherCardHeader
        title={'Автополив'}
        mode={mode}
        availableModes={availableModes}
        onMode={setMode}
      />
      <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-4 h-full">
        <WateringPlant title={plant.title} img={plant.img} />
        <div className="flex flex-col justify-between items-start gap-8 h-full">
          <WateringTitle
            title={plant.title}
            name={plant.name}
            latinName={plant.latinName}
          />
          <WateringTabs plant={plant} />
          <WateringAction
            title={plant.title}
            lastWaterDate={plant.lastWaterDate}
            wateringIntervalDays={plant.wateringIntervalDays}
            reloadPlants={reloadPlants}
          />
        </div>
      </div>
    </WeatherCard>
  )
}
