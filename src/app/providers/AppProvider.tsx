import type { ReactNode } from 'react'
import { Settings } from 'luxon'
import { geistSans, geistMono } from '@/shared/lib/fonts'
import { Toaster } from '@/shared/UI/shadcn/sonner'
import '../globals.css'

Settings.defaultLocale = 'ru'

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
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster closeButton={true} />
      </body>
    </html>
  )
}
