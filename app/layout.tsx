import type { ReactNode } from 'react'
import { Providers } from '@/app/providers'
import { metaData } from '@/shared/config/metadata'

export const metadata = metaData.layout

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return <Providers>{children}</Providers>
}
