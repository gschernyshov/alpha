'use client'

import { House, Globe } from 'lucide-react'
import type { Mode } from '../model/types'
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
        if (value === 'home' || value === 'city') {
          onMode(value)
        }
      }}
      className="flex gap-1.5 p-1 bg-gray-100 rounded-md"
    >
      {availableModes.includes('home') && (
        <ToggleGroupItem
          value="home"
          className={cn(
            'flex gap-1.5 items-center px-2 py-1 rounded-md text-xs font-semibold transition-text duration-300 cursor-pointer',
            mode === 'home'
              ? 'bg-white shadow-sm text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <House className="w-4 h-4" />
          <span>Изба</span>
        </ToggleGroupItem>
      )}

      {availableModes.includes('city') && (
        <ToggleGroupItem
          value="city"
          className={cn(
            'flex gap-1.5 items-center px-2 py-1 rounded-md text-xs font-semibold transition-text duration-300 cursor-pointer',
            mode === 'city'
              ? 'bg-white shadow-sm text-gray-900'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          <Globe className="w-4 h-4" />
          <span>Град</span>
        </ToggleGroupItem>
      )}
    </ToggleGroup>
  )
}
