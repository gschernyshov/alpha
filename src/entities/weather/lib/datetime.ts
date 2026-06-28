import { DateTime } from 'luxon'
import type { WeatherDate } from '../model/types'

const TIMEZONE = process.env.NEXT_PUBLIC_TIMEZONE

export const timeAgo = (date: WeatherDate) => {
  if (date == null) return null

  const { targetDate, now } = dateTime(date)

  return targetDate.toRelative({
    base: now,
  })
}

export const dateTime = (date: NonNullable<WeatherDate>) => {
  const targetDate = DateTime.fromISO(date).setZone(TIMEZONE)
  const now = DateTime.now().setZone(TIMEZONE)

  return {
    targetDate,
    now,
  }
}
