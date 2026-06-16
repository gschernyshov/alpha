import type { ReactNode } from 'react'
import { AppProvider } from './AppProvider'

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return <AppProvider>{children}</AppProvider>
}
