'use client'

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { ToggleGroup, ToggleGroupItem } from '@/shared/UI/shadcn/toggle-group'

export type Mode = {
  Icon: LucideIcon
  label: string
}

export type AvailableModes = Mode[]

interface ToggleModeProps {
  mode: Mode
  availableModes: AvailableModes
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
      value={mode.label}
      onValueChange={label => {
        const newMode = availableModes.find(mode => mode.label === label)

        if (newMode) {
          onMode(newMode)
        }
      }}
      className="flex gap-1.5 p-1 bg-secondary rounded-md"
    >
      {availableModes.map(availableMode => {
        const { Icon, label } = availableMode

        return (
          <ToggleGroupItem
            key={label}
            value={label}
            className={cn(
              'flex gap-1.5 items-center px-2 py-1 rounded-md text-xs font-semibold transition-text duration-300 cursor-pointer',
              mode.label === availableMode.label
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
