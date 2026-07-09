import { NextResponse } from 'next/server'
import type { RateLimitFailure } from '../model/types'

export const makeRateLimitResponse = (result: RateLimitFailure) => {
  return NextResponse.json(
    {
      error: 'Слишком много запросов',
      message: `Лимит превышен. Попробуйте снова через ${result.retryAfter} сек.`,
      retryAfter: result.retryAfter,
    },
    { status: 429 }
  )
}
