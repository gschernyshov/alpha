import { create } from 'zustand'
import type { Plants, Plant } from './types'

type PlantsState = {
  isLoading: boolean
  plants: Plants
  plant: Plant | null
}

type PlantsActions = {
  setIsLoading: (isLoading: boolean) => void
  setPlants: (plants: Plants) => void
  setPlant: (plant: Plant) => void
  reset: () => void
}

type PlantsStoreState = PlantsState & PlantsActions

const initialState: PlantsState = {
  isLoading: false,
  plants: [],
  plant: null,
}

export const usePlantsStore = create<PlantsStoreState>(set => ({
  ...initialState,

  setIsLoading: isLoading => set({ isLoading }),

  setPlants: plants => set({ plants }),

  setPlant: plant => set({ plant }),

  reset: () => set({ ...initialState }),
}))
