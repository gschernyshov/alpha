import type { ReactNode } from 'react'

interface WeatherCardFooterProps {
  children: ReactNode
}

export const WeatherCardFooter = ({ children }: WeatherCardFooterProps) => {
  return <div className="space-y-10">{children}</div>
}
