import type { ReactNode } from 'react'
import { ShineBorder } from '@/shared/UI/shadcn/shine-border'

interface WeatherCardProps {
  id?: string
  colors: string[]
  classNames?: string
  children: ReactNode
}

export const WeatherCard = ({
  id,
  colors,
  classNames = 'w-full md:w-md',
  children,
}: WeatherCardProps) => {
  return (
    <div
      id={id}
      className={`relative flex flex-col justify-between gap-8 p-7 card backdrop-blur-md rounded-3xl shadow-xl md:shadow-2xl dark:shadow-xs dark:shadow-foreground font-mono ${classNames}`}
    >
      <ShineBorder duration={10} shineColor={colors} />
      {children}
    </div>
  )
}
