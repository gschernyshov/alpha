import { useRef, useEffect, useMemo, useCallback } from 'react'
import { usePlantsStore } from './plantsStore'
import type { Plant, Plants } from './types'
import { fetchPlants } from '../api/fetchPlants'
import { Mode } from '@/shared/UI/ToggleMode'

interface UsePlantProps {
  initPlants: Plants
  mode: Mode | null
}

export const usePlants = ({ initPlants, mode }: UsePlantProps) => {
  const initialized = useRef(false)
  const abortController = useRef<AbortController | null>(null)
  const { plants, setIsLoading, setPlants, setPlant } = usePlantsStore()

  const plantsMap = useMemo(() => {
    return new Map(plants.map(plant => [plant.title, plant]))
  }, [plants])

  const plantFirst: Plant | undefined = plants[0]

  const plant: Plant | undefined = useMemo(() => {
    if (mode && plantsMap.has(mode.label)) {
      return plantsMap.get(mode.label)!
    }
    return plantFirst
  }, [mode, plantsMap, plantFirst])

  useEffect(() => {
    if (!initialized.current) {
      setPlants(initPlants)
      initialized.current = true
    }

    setPlant(plant)
  }, [initPlants, plant, setPlants, setPlant])

  const reloadPlants = useCallback(async () => {
    if (abortController.current) {
      abortController.current.abort()
    }

    abortController.current = new AbortController()

    setIsLoading(true)
    try {
      const plantsResult = await fetchPlants(abortController.current.signal)

      setPlants(plantsResult)
    } catch (error) {
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading, setPlants])

  return { reloadPlants }
}
