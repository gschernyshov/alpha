import type { ReactNode } from 'react'
import { ShineBorder } from '@/shared/UI/shadcn/shine-border'

interface WeatherCardProps {
  colors: string[]
  children: ReactNode
}

export const WeatherCard = ({ colors, children }: WeatherCardProps) => {
  return (
    <div className="relative flex flex-col justify-between gap-8 w-full md:w-md p-7 card backdrop-blur-md rounded-3xl shadow-xl md:shadow-2xl dark:shadow-xs dark:shadow-foreground font-mono">
      <ShineBorder duration={10} shineColor={colors} />
      {children}
    </div>
  )
}
