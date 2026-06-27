'use client'

import { Cpu } from 'lucide-react'
import { useStationStatus } from '../model/useStationStatus'
import { statusColors } from '../config/statusColors'

interface StationStatusProps {
  className?: string
}

export const StationStatus = ({ className = '' }: StationStatusProps) => {
  const status = useStationStatus({ intervalMs: 30000 })

  const statusText = {
    loading: 'Проверка ESP8266...',
    online: 'ESP8266 в сети',
    offline: 'ESP8266 не в сети',
  }[status]

  const styles = statusColors[status]

  return (
    <div
      className={`p-4 ${styles.bg} backdrop-blur border ${styles.border} rounded-2xl animate-pulse ${className}`}
    >
      <div className={`flex items-center gap-2 text-md ${styles.text}`}>
        <Cpu size={16} />
        {statusText}
      </div>
    </div>
  )
}
