import { create } from 'zustand'
import type { SoilMoisturePlants } from './types'

type SoilMoisturePlantsState = {
  soilMoisturePlants: SoilMoisturePlants
}

type SoilMoisturePlantsActions = {
  setSoilMoisturePlants: (data: SoilMoisturePlants) => void
  reset: () => void
}

type SoilMoisturePlantsStoreState = SoilMoisturePlantsState &
  SoilMoisturePlantsActions

const initialState: SoilMoisturePlantsState = {
  soilMoisturePlants: [],
}

export const useSoilMoisturePlantsStore = create<SoilMoisturePlantsStoreState>(
  set => ({
    ...initialState,

    setSoilMoisturePlants: data =>
      set({
        soilMoisturePlants: data,
      }),

    reset: () =>
      set({
        soilMoisturePlants: [],
      }),
  })
)
