import { Plant } from '../model/types'

export const getPluralizeDays = (
  days: Plant['wateringIntervalDays']
): string => {
  if (days === null) return '? дня'

  const absDays = Math.abs(days)
  const rem100 = absDays % 100
  const rem10 = absDays % 10

  if (rem10 === 1 && rem100 !== 11) {
    return `${days} день`
  } else if (rem10 >= 2 && rem10 <= 4 && (rem100 < 10 || rem100 >= 20)) {
    return `${days} дня`
  } else {
    return `${days} дней`
  }
}
