import { DateTime } from 'luxon'
import { Info } from 'lucide-react'
import type { WeatherDate } from '../model/types'

interface UpdateInfoProps {
  date: WeatherDate
}

export const UpdateInfo = ({ date }: UpdateInfoProps) => {
  const timeAgo = (date ? DateTime.fromISO(date) : DateTime.now()).toRelative({
    base: DateTime.now(),
    locale: 'ru',
  })

  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Info className="w-4 h-4" />
      <div className="flex flex-col gap-1 text-sm leading-none select-none">
        <span>Обновлено {date ? timeAgo : ' -- минут назад'}</span>
      </div>
    </div>
  )
}
