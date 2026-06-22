import { House, Globe, Leaf, type LucideIcon } from 'lucide-react'
import type { Mode } from './types'

export const MODES = {
  home: { label: 'Изба', Icon: House },
  city: { label: 'Град', Icon: Globe },
  sypha: { label: 'Сифа', Icon: Leaf },
  newton: { label: 'Ньютон', Icon: Leaf },
  hercules: { label: 'Геркулес', Icon: Leaf },
} as const satisfies Record<Mode, { label: string; Icon: LucideIcon }>

export const hasMode = (key: string): key is Mode => {
  return key in MODES
}
