import type { ReactNode } from 'react'
import { geistSans, geistMono } from '@/shared/lib/fonts'
import '../globals.css'

interface AppProviderProps {
  children: ReactNode
  lang?: string
}

export const AppProvider = ({ children, lang = 'ru' }: AppProviderProps) => {
  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col dark">{children}</body>
    </html>
  )
}
