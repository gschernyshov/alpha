import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getMode } from '../lib/getMode'
import { type WeatherMode } from '@/entities/weather'

type ModeState = {
  mode: WeatherMode | null
}

type ModeActions = {
  setMode: (mode: WeatherMode | null) => void
}

type ModeStoreState = ModeState & ModeActions

const initialState: ModeState = {
  mode: null,
}

export const useModeStore = create<ModeStoreState>()(
  persist(
    set => ({
      ...initialState,

      setMode: mode => set({ mode }),
    }),
    {
      name: 'mode-plants',
      storage: {
        getItem: name => {
          const label = localStorage.getItem(name)
          if (!label) return null

          return { state: { mode: getMode(label) } }
        },
        setItem: (name, value) => {
          localStorage.setItem(name, value.state.mode.label)
        },
        removeItem: name => {
          localStorage.removeItem(name)
        },
      },
    }
  )
)
