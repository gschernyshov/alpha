import { DateTime } from 'luxon'
import { Plant } from '../model/types'

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

  const now = DateTime.now()

  const lastWatering = DateTime.fromISO(lastWaterDate)
  const nextWatering = lastWatering.plus({ days: wateringIntervalDays })

  const diffWatering = Math.round(nextWatering.diff(now).as('days') * 10) / 10

  const toWatering = nextWatering.toRelative({
    base: now,
    locale: 'ru',
  })

  return {
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
