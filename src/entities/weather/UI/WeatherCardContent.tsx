import { Thermometer, CloudRain, Wind } from 'lucide-react'
import { UpdateInfo } from './UpdateInfo'
import {
  Temperature,
  Humidity,
  Illumination,
  WeatherDate,
  WeatherOutdoor,
} from '../model/types'
import { NumberTicker } from '@/shared/UI/shadcn/number-ticker'

interface WeatherCardContentProps {
  value: Temperature | Humidity | Illumination
  otherValues: Partial<
    Pick<WeatherOutdoor, 'feelsLike' | 'pressure' | 'windSpeed' | 'humidity'>
  > | null
  date: WeatherDate
  unit?: string
  onUnit?: () => void
}

export const WeatherCardContent = ({
  value,
  otherValues,
  date,
  unit,
  onUnit,
}: WeatherCardContentProps) => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-4 w-full">
        <div className="flex flex-col items-start">
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

          {otherValues && otherValues.feelsLike != null && (
            <span className="text-xs uppercase  opacity-80 text-gray-500">
              Ощущается <br />
              как {otherValues?.feelsLike.toFixed(0)} °C
            </span>
          )}
        </div>

        {otherValues && (
          <div className="flex flex-col w-full items-center text-centertext-xs md:text-sm text-muted-foreground/90">
            <div className="flex w-auto gap-8">
              {otherValues.pressure != null && (
                <div className="flex flex-col items-center gap-1">
                  <CloudRain className="w-4 h-4 text-foreground opacity-80 mb-0.5" />
                  <span className="text-md font-medium text-foreground">
                    {Math.round(otherValues.pressure)} мм
                  </span>
                  <span className="text-xs uppercase tracking-wider opacity-70">
                    Давление
                  </span>
                </div>
              )}

              {otherValues.windSpeed != null && (
                <div className="flex flex-col items-center gap-1">
                  <Wind className="w-4 h-4 text-foreground opacity-80 mb-0.5" />
                  <span className="text-md font-medium text-foreground">
                    {otherValues.windSpeed.toFixed(1)} м/с
                  </span>
                  <span className="text-xs uppercase tracking-wider opacity-70">
                    Ветер
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <UpdateInfo date={date} />
    </div>
  )
}
