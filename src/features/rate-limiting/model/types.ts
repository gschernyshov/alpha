export type RateLimitSuccess = {
  allowed: true
  remaining: number
  limit: number
  reset: number
}

export type RateLimitFailure = {
  allowed: false
  remaining: 0
  limit: number
  reset: number
  retryAfter: number
}

export type RateLimitResult = RateLimitSuccess | RateLimitFailure
