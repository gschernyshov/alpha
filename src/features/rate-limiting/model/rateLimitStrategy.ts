import { DateTime } from 'luxon'
import type { RateLimitResult } from './types'
import { redis } from '@/shared/db/redis'

const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX || 10)
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000)

const getResetTime = () => {
  const now = DateTime.utc()
  const reset = now.plus({ milliseconds: WINDOW_MS })
  return Math.floor(reset.toMillis() / 1000)
}

export const rateLimit = async (key: string): Promise<RateLimitResult> => {
  try {
    if (!redis.isOpen) {
      await redis.connect()
    }

    const now = DateTime.utc()
    const nowSeconds = Math.floor(now.toMillis() / 1000)
    const windowStartSeconds =
      now.minus({ milliseconds: WINDOW_MS }).toMillis() / 1000

    const multi = redis.multi()
    multi.zRemRangeByScore(key, '-inf', windowStartSeconds)
    multi.zCard(key)
    await multi.exec()

    const count = await redis.zCard(key)

    if (typeof count !== 'number') {
      throw new Error(
        `Ожидался тип "number" от zCard, но получен "${typeof count}". ` +
          'Это может означать проблему с подключением к Redis или внутреннюю ошибку.'
      )
    }

    if (count >= MAX_REQUESTS) {
      const ttl = await redis.ttl(key)
      const retryAfter = ttl > 0 ? ttl : Math.ceil(WINDOW_MS / 1000)

      return {
        allowed: false,
        remaining: 0,
        limit: MAX_REQUESTS,
        reset: getResetTime(),
        retryAfter,
      }
    }

    const score = nowSeconds
    const member = `${now.toMillis()}-${Math.random()}`
    await redis.zAdd(key, { score, value: member })

    await redis.expire(key, Math.ceil(WINDOW_MS / 1000) + 1)

    return {
      allowed: true,
      remaining: MAX_REQUESTS - count - 1,
      limit: MAX_REQUESTS,
      reset: getResetTime(),
    }
  } catch (error) {
    console.error('Redis rate limiter error: ', error)

    return {
      allowed: true,
      remaining: MAX_REQUESTS,
      limit: MAX_REQUESTS,
      reset: getResetTime(),
    }
  }
}
