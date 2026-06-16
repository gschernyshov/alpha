import type { ReactNode } from 'react'
import { AppProvider } from './AppProvider'
import { StylesProvider } from './StylesProvider'

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <AppProvider>
      <StylesProvider>{children}</StylesProvider>
    </AppProvider>
  )
}
