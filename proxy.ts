import { type NextRequest } from 'next/server'
import { processRateLimit } from '@/app/middleware'

export const config = {
  matcher: ['/api/:path*'],
}

export default async function proxy(req: NextRequest) {
  return await processRateLimit(req)
}
