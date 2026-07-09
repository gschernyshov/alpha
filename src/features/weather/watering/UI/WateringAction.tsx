import { useEffect } from 'react'
import { Droplet } from 'lucide-react'
import { toast } from 'sonner'
import { useWateringStart } from '../model/useWateringStart'
import type { Plant } from '../model/types'
import { getWateringInfo } from '../lib/getWateringInfo'
import { Button } from '@/shared/UI/shadcn/button'
import { AlertMessage } from '@/shared/UI/AlertMessage'

interface WateringActionProps {
  title: Plant['title']
  lastWaterDate: Plant['lastWaterDate']
  wateringIntervalDays: Plant['wateringIntervalDays']
  reloadPlants: () => Promise<void>
}

const NEXT_PUBLIC_WATERING_EARLY_ACCESS_DAYS =
  process.env.NEXT_PUBLIC_WATERING_EARLY_ACCESS_DAYS

export const WateringAction = ({
  title,
  lastWaterDate,
  wateringIntervalDays,
  reloadPlants,
}: WateringActionProps) => {
  const { isLoading, isSuccess, error, startWatering, reset } =
    useWateringStart({
      reloadPlants,
    })

  useEffect(() => {
    if (isSuccess) {
      toast.success(`Растение ${title} полито`)
      reset()
    }
  }, [title, isSuccess, reset])

  useEffect(() => {
    if (error) {
      toast.error(error)
      reset()
    }
  }, [error, reset])

  const { nextWatering, toWatering, diffWatering } = getWateringInfo(
    lastWaterDate,
    wateringIntervalDays
  )

  return (
    <div className="flex flex-col justify-between items-start gap-8 h-full">
      <div className="flex flex-row justify-between md:justify-start items-center gap-4 md:gap-15 w-full">
        <div
          className={`flex flex-col items-start gap-4 md:gap-2 ${diffWatering !== null && diffWatering < 0 ? 'text-red-500' : 'text-black dark:text-white/80'}`}
        >
          <span className="text-md font-semibold">
            {diffWatering !== null && diffWatering < 0
              ? 'Полив пропущен'
              : 'Следующий полив через'}
          </span>

          <div className="flex flex-col md:flex-row items-baseline gap-2 md:gap-4">
            <span className="text-4xl font-bold">{toWatering ?? '? дня'}</span>

            {nextWatering && (
              <span className="text-sm text-muted-foreground font-medium">
                {nextWatering}
              </span>
            )}
          </div>
        </div>

        <Button
          variant="outline"
          aria-label="Полить растение"
          disabled={
            isLoading ||
            (diffWatering !== null &&
              diffWatering <=
                Number(NEXT_PUBLIC_WATERING_EARLY_ACCESS_DAYS || '2'))
              ? false
              : true
          }
          onClick={() => startWatering(title)}
          className={`w-18 md:w-27 h-38 md:h-27 shrink-0 ${isLoading ? 'bg-sky-600 hover:bg-sky-700' : 'bg-emerald-600 hover:bg-emerald-700'} rounded-full shadow-md text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:text-white focus:ring-2 ${isLoading ? 'focus:ring-sky-100' : 'focus:ring-emerald-100'}`}
        >
          <Droplet className="h-8 w-8" />
        </Button>
      </div>

      <AlertMessage
        title="Ручной полив"
        message={`Кнопка ручного полива станет доступна за ${NEXT_PUBLIC_WATERING_EARLY_ACCESS_DAYS || '2'} дня до следующего полива. До ${nextWatering ?? '--'} вы сможете полить растение самостоятельно и отменить автоматический полив.`}
        className="bg-emerald-50 dark:bg-slate-800"
      />
    </div>
  )
}
