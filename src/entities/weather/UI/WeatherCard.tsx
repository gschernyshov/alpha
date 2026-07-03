import type { ReactNode } from 'react'
import { Spinner } from '@/shared/UI/shadcn/spinner'
import { ShineBorder } from '@/shared/UI/shadcn/shine-border'

interface WeatherCardProps {
  id?: string
  isLoading?: boolean
  colors: string[]
  classNames?: string
  children: ReactNode
}

export const WeatherCard = ({
  id,
  isLoading,
  colors,
  classNames = 'w-full md:w-md',
  children,
}: WeatherCardProps) => {
  return (
    <div
      id={id}
      className={`relative flex flex-col justify-between gap-8 p-7 card backdrop-blur-md rounded-3xl shadow-xl md:shadow-2xl dark:shadow-xs dark:shadow-foreground font-mono ${classNames}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex justify-center items-center bg-background/10 backdrop-blur-xs z-50">
          <Spinner className="size-10" />
        </div>
      )}
      <ShineBorder duration={10} shineColor={colors} />
      {children}
    </div>
  )
}
