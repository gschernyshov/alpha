import { ReactNode } from 'react'
import { StylesProvider } from './StylesProvider'

interface ProvidersProps {
  children: ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return <StylesProvider>{children}</StylesProvider>
}
