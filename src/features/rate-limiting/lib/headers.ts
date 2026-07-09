import type { NextResponse } from 'next/server'
import type { RateLimitResult } from '../model/types'

export const applyRateLimitHeaders = (
  response: NextResponse,
  result: RateLimitResult
) => {
  response.headers.set('X-RateLimit-Remaining', String(result.remaining))
  response.headers.set('X-RateLimit-Limit', String(result.limit))
  response.headers.set('X-RateLimit-Reset', String(result.reset))

  if (!result.allowed) {
    response.headers.set('Retry-After', String(result.retryAfter))
  }

  return response
}
