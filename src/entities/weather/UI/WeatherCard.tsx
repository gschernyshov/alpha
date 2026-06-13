import { ReactNode } from 'react'
import { ShineBorder } from '@/shared/UI/shadcn/shine-border'

interface WeatherCardProps {
  colors: string[]
  children: ReactNode
}

export const WeatherCard = ({ colors, children }: WeatherCardProps) => {
  return (
    <div className="relative p-7 space-y-10 bg-white backdrop-blur-md rounded-3xl shadow-2xl font-geist-mono">
      <ShineBorder duration={10} shineColor={colors} />
      {children}
    </div>
  )
}
