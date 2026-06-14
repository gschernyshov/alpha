import { Thermometer } from 'lucide-react'
import { UpdateInfo } from './UpdateInfo'
import {
  Temperature,
  Humidity,
  Illumination,
  WeatherDate,
} from '../model/types'
import { NumberTicker } from '@/shared/UI/shadcn/number-ticker'

interface WeatherCardContentProps {
  value: Temperature | Humidity | Illumination
  date: WeatherDate
  unit?: string
  onUnit?: () => void
}

export const WeatherCardContent = ({
  value,
  date,
  unit,
  onUnit,
}: WeatherCardContentProps) => {
  return (
    <div className="space-y-5">
      <div className="flex gap-4">
        <span className="text-8xl text-black dark:text-white font-semibold tracking-tighter leading-none select-none">
          {value !== null ? (
            <NumberTicker
              value={value}
              className="text-8xl text-black dark:text-white font-semibold tracking-tighter whitespace-pre-wrap leading-none select-none"
            />
          ) : (
            '--'
          )}
        </span>

        {unit && (
          <div className="flex flex-col justify-between gap-4 py-4">
            <p
              className="
                text-xl text-black dark:text-white
                font-semibold tracking-tighter leading-none select-none
              "
            >
              {unit}
            </p>

            {onUnit && (
              <span
                className="p-1.5 bg-black dark:bg-white rounded-full cursor-pointer"
                onClick={onUnit}
              >
                <Thermometer className="h-3 w-3 text-white dark:text-black" />
              </span>
            )}
          </div>
        )}
      </div>

      <UpdateInfo date={date} />
    </div>
  )
}
