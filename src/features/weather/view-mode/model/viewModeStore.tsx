import { create } from 'zustand'

type ViewMode = 'full' | 'compact'

type ViewModeState = {
  viewMode: ViewMode
}

type ViewModeActions = {
  setViewMode: (mode: ViewMode) => void
  toggleViewMode: () => void
}

type ViewModeStoreState = ViewModeState & ViewModeActions

const initialState: ViewModeState = {
  viewMode: 'full',
}

export const useViewModeStore = create<ViewModeStoreState>(set => ({
  ...initialState,

  setViewMode: mode => set({ viewMode: mode }),

  toggleViewMode: () =>
    set(state => ({
      viewMode: state.viewMode === 'full' ? 'compact' : 'full',
    })),
}))
