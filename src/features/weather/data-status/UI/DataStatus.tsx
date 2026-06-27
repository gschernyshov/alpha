'use client'

import { useState, useMemo } from 'react'
import { DateTime } from 'luxon'
import { getStatus } from '../lib/getStatus'
import { statusColors } from '../config/statusColors'
import { useWeatherStore } from '@/entities/weather'

interface DataStatusProps {
  className?: string
}

export const DataStatus = ({ className = '' }: DataStatusProps) => {
  const indoorDate = useWeatherStore(state => state.indoor.date)
  const outdoorTime = useWeatherStore(state => state.outdoor.time)
  const [isShowDate, setIsShowDate] = useState(false)

  const status = useMemo(() => getStatus(indoorDate), [indoorDate])

  const date = useMemo(
    () => ({
      indoor: indoorDate
        ? DateTime.fromISO(indoorDate).toRelative({
            base: DateTime.now(),
            locale: 'ru',
          })
        : 'информация отсутствует',
      outdoor: outdoorTime
        ? DateTime.fromISO(outdoorTime).toRelative({
            base: DateTime.now(),
            locale: 'ru',
          })
        : 'информация отсутствует',
    }),
    [indoorDate, outdoorTime]
  )

  if (!status) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-1.5 backdrop-blur border border-zinc-500/20 rounded-md ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-pulse" />
        <span className="text-sm text-zinc-400">Загрузка данных...</span>
      </div>
    )
  }

  const styles = statusColors[status.level]

  return (
    <div
      className={`flex flex-col gap-3 px-3 py-1.5 ${styles.bg} backdrop-blur border ${styles.border} rounded-md select-none z-100 cursor-pointer ${className}`}
      onClick={() => setIsShowDate(prev => !prev)}
    >
      <div className="flex items-center gap-2">
        {' '}
        <span
          className={`w-2 h-2 rounded-full ${styles.pulseColor} animate-pulse`}
        />
        <span className={`text-sm ${styles.text}`}>данные {status.label}</span>
      </div>

      {isShowDate && (
        <div
          className={`flex flex-col gap-1 pl-4 opacity-75 text-xs ${styles.text}`}
        >
          <span>Изба: {date.indoor}</span>
          <span>Град: {date.outdoor}</span>
        </div>
      )}
    </div>
  )
}
