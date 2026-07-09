export const createRateLimitKey = (ip: string, pathname: string) => {
  return `ratelimit:api:${ip}:${pathname}`
}
