import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Mode } from '@/entities/weather'

type ModeState = {
  mode: Mode
}

type ModeActions = {
  setMode: (mode: Mode) => void
}

type ModeStoreState = ModeState & ModeActions

const initialState: ModeState = {
  mode: 'home',
}

export const useModeStore = create<ModeStoreState>()(
  persist<ModeStoreState>(
    set => ({
      ...initialState,
      setMode: mode => set({ mode }),
    }),
    {
      name: 'mode-humidity',
    }
  )
)
