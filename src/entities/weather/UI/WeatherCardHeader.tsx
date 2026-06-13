import { Mode } from '../model/types'
import { ToggleMode } from '@/entities/weather/UI/ToggleMode'

interface WeatherCardHeaderProps {
  title: string
  mode?: Mode
  onMode?: (mode: Mode) => void
}

export const WeatherCardHeader = ({
  title,
  mode,
  onMode,
}: WeatherCardHeaderProps) => {
  return (
    <div className="flex justify-between gap-4 items-center">
      <p
        className="
          uppercase text-md text-muted-foreground 
          font-medium tracking-wide leading-none select-none
        "
      >
        {title}
      </p>

      {mode && onMode && <ToggleMode mode={mode} onMode={onMode} />}
    </div>
  )
}
