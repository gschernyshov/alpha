import { type NextRequest } from 'next/server'
import { processRateLimit } from '@/app/middleware'

export default async function proxy(req: NextRequest) {
  return await processRateLimit(req)
}
