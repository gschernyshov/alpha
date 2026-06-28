import { dateTime, type WeatherDate } from '@/entities/weather'

export type DataStatusLevel = 'fresh' | 'stale' | 'outdated'

export type DataStatus = {
  level: DataStatusLevel
  label: string
}

export const getStatus = (date: WeatherDate): DataStatus | null => {
  if (!date) return null

  const { targetDate: lastUpdate, now } = dateTime(date)

  const diff = now.diff(lastUpdate, ['hours'])

  const hoursDiff = Math.floor(diff.hours)
  if (hoursDiff < 0) return null

  let level: DataStatusLevel
  let label: string

  if (hoursDiff <= 2) {
    level = 'fresh'
    label = 'актуальны'
  } else if (hoursDiff <= 4) {
    level = 'stale'
    label = 'несвежие'
  } else {
    level = 'outdated'
    label = 'устарели'
  }

  return { level, label }
}
