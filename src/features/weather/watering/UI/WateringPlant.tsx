import Image from 'next/image'
import { useState, useMemo } from 'react'
import { Droplet } from 'lucide-react'
import { useSoilMoisturePlantsStore } from '../model/soilMoisturePlantsStore'
import { Plant } from '../model/types'
import { getHumidityColor } from '../lib/getHumidityColor'
import { timeAgo, safeValue } from '@/entities/weather'
import { useIsMobile } from '@/shared/hooks/useIsMobile'

interface WateringPlantProps {
  title: Plant['title']
  img: Plant['img']
}

export const WateringPlant = ({ title, img }: WateringPlantProps) => {
  const soilMoisturePlants = useSoilMoisturePlantsStore(
    state => state.soilMoisturePlants
  )
  const [isShowLastSoilMoistureDate, setIsShowLastSoilMoistureDate] =
    useState(false)
  const isMobile = useIsMobile()

  const soilMoisturePlant = useMemo(() => {
    return soilMoisturePlants.find(
      soilMoisturePlant => soilMoisturePlant.title === title
    )
  }, [title, soilMoisturePlants])

  return (
    <div className="relative min-w-full md:min-w-[400px] min-h-[300px] md:pt-10">
      <Image
        alt="Изображение растения"
        src={`/plants/${img}`}
        width={isMobile ? 300 : 400}
        height={isMobile ? 300 : 400}
      />

      {soilMoisturePlant && (
        <div
          className="absolute bottom-0 md:bottom-3 right-10 md:left-20 md:right-auto flex flex-col gap-1.5 px-2 py-1.5 bg-black/30 backdrop-blur-sm rounded-lg shadow-md text-white select-none cursor-pointer"
          onClick={() => setIsShowLastSoilMoistureDate(prev => !prev)}
          onMouseEnter={() => setIsShowLastSoilMoistureDate(true)}
          onMouseLeave={() => setIsShowLastSoilMoistureDate(false)}
        >
          <span className="text-[10px] font-medium uppercase tracking-wide opacity-80">
            Влажность почвы
          </span>

          <div className="flex items-center gap-1.5">
            <Droplet
              className="w-4 h-4 shrink-0"
              style={{
                color: getHumidityColor(soilMoisturePlant.value),
                fill: 'currentColor',
              }}
            />
            <span className="text-sm font-semibold">
              {safeValue(soilMoisturePlant.value)}%
            </span>
          </div>

          {isShowLastSoilMoistureDate && (
            <div className="text-xs tracking-wide opacity-80">
              обновлено {timeAgo(soilMoisturePlant.date) ?? ' -- минут назад'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
