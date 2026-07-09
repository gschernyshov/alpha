import type { NextRequest } from 'next/server'

export const getIPFromRequest = (req: NextRequest) => {
  const headers = req.headers

  const ipFromHeaders =
    headers.get('cf-connecting-ip') ||
    headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    headers.get('x-real-ip') ||
    ''

  return (
    ipFromHeaders ||
    (process.env.NODE_ENV === 'development' ? '127.0.0.1' : 'unknown')
  )
}
