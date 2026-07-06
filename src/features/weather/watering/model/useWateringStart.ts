import { useRef, useState, useCallback } from 'react'
import axios, { isAxiosError } from 'axios'
import type { Plant } from './types'
import { fetchWateringStart } from '../api/fetchWateringStart'

interface UseWateringStartProps {
  reloadPlants: () => Promise<void>
}

export const useWateringStart = ({ reloadPlants }: UseWateringStartProps) => {
  const abortController = useRef<AbortController | null>(null)
  const [state, setState] = useState({
    isLoading: false,
    isSuccess: false,
    error: '',
  })

  const startWatering = useCallback(
    async (title: Plant['title']) => {
      if (abortController.current) {
        abortController.current.abort()
      }

      abortController.current = new AbortController()

      setState({ isLoading: true, isSuccess: false, error: '' })
      try {
        await fetchWateringStart({ title }, abortController.current.signal)
        await reloadPlants()

        setState(prev => ({
          ...prev,
          isSuccess: true,
        }))
      } catch (error) {
        if (isAxiosError(error)) {
          if (axios.isCancel(error)) {
            console.log('Watering request cancelled')
            return
          }

          setState(prev => ({
            ...prev,
            error:
              error.response?.data?.error ||
              error.message ||
              'Ошибка при поливе растения',
          }))

          console.error('Watering request error: ', error)
        }
      } finally {
        setState(prev => ({ ...prev, isLoading: false }))
      }
    },
    [reloadPlants]
  )

  const reset = useCallback(() => {
    setState({ isLoading: false, isSuccess: false, error: '' })
  }, [])

  return { ...state, startWatering, reset }
}
