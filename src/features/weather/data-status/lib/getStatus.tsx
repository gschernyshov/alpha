import { DateTime } from 'luxon'
import { WeatherDate } from '@/entities/weather'

export type DataStatusLevel = 'fresh' | 'stale' | 'outdated'

export type DataStatus = {
  level: DataStatusLevel
  label: string
}

export const getStatus = (dateString: WeatherDate): DataStatus | null => {
  if (!dateString) return null

  const lastUpdate = DateTime.fromISO(dateString)
  if (!lastUpdate.isValid) return null

  const now = DateTime.local()
  const diff = now.diff(lastUpdate, ['hours'])
  const hoursDiff = Math.floor(diff.hours)

  if (hoursDiff < 0) return null

  let level: DataStatusLevel
  let label: string

  if (hoursDiff <= 13) {
    level = 'fresh'
    label = 'актуальны'
  } else if (hoursDiff <= 12) {
    level = 'stale'
    label = 'несвежие'
  } else {
    level = 'outdated'
    label = 'устарели'
  }

  return { level, label }
}
