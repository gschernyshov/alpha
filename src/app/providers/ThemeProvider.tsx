'use client'

import { useEffect, type ReactNode } from 'react'
import { DateTime } from 'luxon'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const hour = DateTime.local().hour

    const isNight = hour >= 18 || hour < 7

    if (isNight) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return children
}
