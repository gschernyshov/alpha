'use client'

import type { Mode } from '../model/types'
import { MODES, hasMode } from '../model/modes'
import { cn } from '@/shared/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@/shared/UI/shadcn/toggle-group'

interface ToggleModeProps {
  mode: Mode
  availableModes: Mode[]
  onMode: (value: Mode) => void
}

export const ToggleMode = ({
  mode,
  availableModes,
  onMode,
}: ToggleModeProps) => {
  return (
    <ToggleGroup
      type="single"
      value={mode}
      onValueChange={value => {
        if (hasMode(value) && availableModes.includes(value)) {
          onMode(value)
        }
      }}
      className="flex gap-1.5 p-1 bg-secondary rounded-md"
    >
      {availableModes.map(availableMode => {
        const { label, Icon } = MODES[availableMode]

        return (
          <ToggleGroupItem
            key={availableMode}
            value={availableMode}
            className={cn(
              'flex gap-1.5 items-center px-2 py-1 rounded-md text-xs font-semibold transition-text duration-300 cursor-pointer',
              mode === availableMode
                ? 'bg-secondary-foreground! shadow-sm text-secondary hover:text-secondary'
                : 'text-secondary-foreground hover:text-muted-foreground'
            )}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </ToggleGroupItem>
        )
      })}
    </ToggleGroup>
  )
}
