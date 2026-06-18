import type { ReactNode } from 'react'
import { AppProvider } from './AppProvider'
import { ThemeProvider } from './ThemeProvider'

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppProvider>
  )
}
