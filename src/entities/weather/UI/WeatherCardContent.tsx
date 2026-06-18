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
      <div className="flex justify-between items-center gap-10 w-full">
        <div className="flex flex-col items-start">
          <div className="flex gap-4">
            <span className="text-8xl text-foreground font-semibold tracking-tighter leading-none select-none">
              {value !== null ? (
                <NumberTicker
                  value={value}
                  className="text-8xl text-foreground font-semibold tracking-tighter whitespace-pre-wrap leading-none select-none"
                />
              ) : (
                '--'
              )}
            </span>

            {unit && (
              <div className="flex flex-col justify-between gap-4 py-4">
                <p
                  className="
                    text-xl text-foreground
                    font-semibold tracking-tighter leading-none select-none
                  "
                >
                  {unit}
                </p>

                {onUnit && (
                  <span
                    className="p-1.5 bg-foreground rounded-full cursor-pointer"
                    onClick={onUnit}
                  >
                    <Thermometer className="w-3 h-3 text-background" />
                  </span>
                )}
              </div>
            )}
          </div>

          {otherValues?.feelsLike != null && (
            <span className="uppercase text-sm text-muted-foreground tracking-tighter select-none">
              Ощущается как {otherValues?.feelsLike.toFixed(0)} °C
            </span>
          )}
        </div>

        {otherValues && (
          <div className="flex gap-10">
            {otherValues.pressure != null && (
              <div className="flex flex-col items-center gap-1">
                <CloudRain className="w-4 h-4 mb-0.5 text-foreground" />
                <span className="text-md font-medium text-foreground">
                  {Math.round(otherValues.pressure)} мм
                </span>
                <span className="uppercase text-xs text-muted-foreground tracking-wider">
                  Давление
                </span>
              </div>
            )}

            {otherValues.windSpeed != null && (
              <div className="flex flex-col items-center gap-1">
                <Wind className="w-4 h-4 mb-0.5 text-foreground" />
                <span className="text-md font-medium text-foreground">
                  {otherValues.windSpeed.toFixed(1)} м/с
                </span>
                <span className="uppercase text-xs text-muted-foreground tracking-wider">
                  Ветер
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      <UpdateInfo date={date} />
    </div>
  )
}
