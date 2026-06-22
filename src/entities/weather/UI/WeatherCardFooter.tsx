import type { ReactNode } from 'react'
import { UpdateInfo } from './UpdateInfo'
import { WeatherDate } from '../model/types'

interface WeatherCardFooterProps {
  date: WeatherDate
  children: ReactNode
}

export const WeatherCardFooter = ({
  date,
  children,
}: WeatherCardFooterProps) => {
  return (
    <div className="space-y-8">
      {children}
      <UpdateInfo date={date} />
    </div>
  )
}
