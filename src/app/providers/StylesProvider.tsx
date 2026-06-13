import { ReactNode } from 'react'
import '../globals.css'

interface StylesProviderProps {
  children: ReactNode
}

export const StylesProvider = ({ children }: StylesProviderProps) => {
  return children
}
