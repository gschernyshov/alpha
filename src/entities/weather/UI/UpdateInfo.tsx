import { DateTime } from 'luxon'
import { Info } from 'lucide-react'
import { WeatherDate } from '../model/types'

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
      <Info className="h-5 w-5" />
      <div className="flex flex-col gap-1 text-sm leading-none select-none">
        <span>Обновлено</span>
        <span>{date ? timeAgo : '-- часов назад'}</span>
      </div>
    </div>
  )
}
