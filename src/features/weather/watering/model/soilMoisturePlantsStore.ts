import { create } from 'zustand'
import { SoilMoisturePlants } from './types'

type SoilMoisturePlantsState = {
  soilMoisturePlants: SoilMoisturePlants
}

type SoilMoisturePlantsActions = {
  setSoilMoisture: (data: SoilMoisturePlants) => void
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

    setSoilMoisture: data =>
      set({
        soilMoisturePlants: data,
      }),

    reset: () =>
      set({
        soilMoisturePlants: [],
      }),
  })
)
