import type { Plant } from '../model/types'
import { dateTime } from '@/entities/weather'

export const getWateringInfo = (
  lastWaterDate: Plant['lastWaterDate'],
  wateringIntervalDays: Plant['wateringIntervalDays']
) => {
  if (!lastWaterDate || !wateringIntervalDays) {
    return {
      nextWatering: null,
      toWatering: null,
      diffWatering: null,
    }
  }

  const { targetDate: lastWatering, now } = dateTime(lastWaterDate)

  const nextWatering = lastWatering.plus({ days: wateringIntervalDays })

  const toWatering = nextWatering.toRelative({
    base: now,
  })

  const diffWatering = Math.round(nextWatering.diff(now).as('days') * 10) / 10

  return {
    lastWatering: lastWatering.toLocaleString({
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }),
    nextWatering: nextWatering.toLocaleString({
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }),
    toWatering: toWatering?.replace(/^через\s+/, '') ?? null,
    diffWatering,
  }
}
