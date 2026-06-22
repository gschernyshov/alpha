'use client'

import { useMemo } from 'react'
import { getStatus } from '../lib/getStatus'
import { statusColors } from '../config/statusColors'
import { useWeatherStore } from '@/entities/weather'

interface DataStatusProps {
  className?: string
}

export const DataStatus = ({ className = '' }: DataStatusProps) => {
  const lastUpdate = useWeatherStore(state => state.indoor.date)

  const status = useMemo(() => getStatus(lastUpdate), [lastUpdate])

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
      className={`flex items-center gap-2 px-3 py-1.5 ${styles.bg} backdrop-blur border ${styles.border} rounded-md ${className}`}
    >
      <span
        className={`w-2 h-2 rounded-full ${styles.pulseColor} animate-pulse`}
      />
      <span className={`text-sm ${styles.text}`}>данные {status.label}</span>
    </div>
  )
}
