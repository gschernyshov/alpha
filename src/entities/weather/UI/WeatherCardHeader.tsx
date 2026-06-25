import type { WeatherMode } from '../model/types'
import { ToggleMode } from '@/src/shared/UI/ToggleMode'

interface WeatherCardHeaderProps {
  title: string
  mode?: WeatherMode
  availableModes?: WeatherMode[]
  onMode?: (mode: WeatherMode) => void
}

export const WeatherCardHeader = ({
  title,
  mode,
  availableModes,
  onMode,
}: WeatherCardHeaderProps) => {
  return (
    <div className="flex flex-wrap justify-between gap-3 md:gap-4 items-center">
      <p
        className="
          uppercase text-md text-muted-foreground 
          font-medium tracking-wide leading-none select-none
        "
      >
        {title}
      </p>

      {mode && availableModes && onMode && (
        <ToggleMode
          mode={mode}
          availableModes={availableModes}
          onMode={onMode}
        />
      )}
    </div>
  )
}
