import { Info } from 'lucide-react'
import type { WeatherDate } from '../model/types'
import { timeAgo } from '../lib/datetime'

interface UpdateInfoProps {
  date: WeatherDate
}

export const UpdateInfo = ({ date }: UpdateInfoProps) => {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <Info className="w-4 h-4" />
      <div className="flex flex-col gap-1 text-sm leading-none select-none">
        <span>Обновлено {date ? timeAgo(date) : ' -- минут назад'}</span>
      </div>
    </div>
  )
}
