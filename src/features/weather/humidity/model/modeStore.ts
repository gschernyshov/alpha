import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { initMode, availableModes, type WeatherMode } from '@/entities/weather'

type ModeState = {
  mode: WeatherMode
}

type ModeActions = {
  setMode: (mode: WeatherMode) => void
}

type ModeStoreState = ModeState & ModeActions

const initialState: ModeState = {
  mode: initMode,
}

export const useModeStore = create<ModeStoreState>()(
  persist(
    set => ({
      ...initialState,

      setMode: mode => set({ mode }),
    }),
    {
      name: 'mode-humidity',
      storage: {
        getItem: name => {
          const label = localStorage.getItem(name)
          if (!label) return null

          const mode = availableModes.find(
            availableMode => availableMode.label === label
          )

          return { state: { mode: mode ?? initMode } }
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
