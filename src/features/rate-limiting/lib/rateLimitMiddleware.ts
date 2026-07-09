import { type NextRequest, NextResponse } from 'next/server'
import { getIPFromRequest } from '../model/getIPFromRequest'
import { createRateLimitKey } from '../model/createRateLimitKey'
import { rateLimit } from '../model/rateLimitStrategy'
import { makeRateLimitResponse } from './makeRateLimitResponse'
import { applyRateLimitHeaders } from './headers'

export const processRateLimit = async (
  req: NextRequest
): Promise<NextResponse> => {
  const ip = getIPFromRequest(req)
  const pathname = req.nextUrl.pathname

  const key = createRateLimitKey(ip, pathname)

  const result = await rateLimit(key)

  if (!result.allowed) {
    const response = makeRateLimitResponse(result)
    return applyRateLimitHeaders(response, result)
  }

  return applyRateLimitHeaders(NextResponse.next(), result)
}
