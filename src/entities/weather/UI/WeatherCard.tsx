import type { ReactNode } from 'react'
import { ShineBorder } from '@/shared/UI/shadcn/shine-border'

interface WeatherCardProps {
  colors: string[]
  children: ReactNode
}

export const WeatherCard = ({ colors, children }: WeatherCardProps) => {
  return (
    <div className="relative w-full md:max-w-md p-7 space-y-10 bg-white backdrop-blur-md rounded-3xl shadow-xl md:shadow-2xl font-geist-mono">
      <ShineBorder duration={10} shineColor={colors} />
      {children}
    </div>
  )
}
