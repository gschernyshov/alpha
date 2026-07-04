import { useRef, useEffect, useMemo } from 'react'
import { useModeStore } from './modeStore'
import type { Plants, Plant } from './types'
import { getMode, getAvailableModes } from '../lib/getMode'

interface UseModeProps {
  plants: Plants
  plant: Plant | null
}

export const useMode = ({ plants, plant }: UseModeProps) => {
  const initialized = useRef(false)
  const { setMode } = useModeStore()

  useEffect(() => {
    if (!initialized.current && plant) {
      setMode(getMode(plant.title))
      initialized.current = true
    }
  }, [plant, setMode])

  const availableModes = useMemo(() => {
    return getAvailableModes(plants.map(plant => plant.title))
  }, [plants])

  return { availableModes }
}
