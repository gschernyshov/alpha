import { useState, useEffect } from 'react'
import axios from 'axios'
import { fetchSatusStation } from '../api/statusStation'

interface UseStationStatusProps {
  intervalMs?: number
  enabled?: boolean
}

export const useStationStatus = ({
  intervalMs = 10000,
  enabled = true,
}: UseStationStatusProps) => {
  const [status, setStatus] = useState<'loading' | 'online' | 'offline'>(
    'loading'
  )

  useEffect(() => {
    if (!enabled) return

    let abortController: AbortController | null = null
    let intervalId: NodeJS.Timeout | null = null

    const checkStatus = async () => {
      if (abortController) {
        abortController.abort()
      }
      abortController = new AbortController()

      setStatus('loading')
      try {
        await fetchSatusStation()

        setStatus('online')
      } catch (error) {
        setStatus('offline')

        if (axios.isCancel(error)) {
          console.log('Station Status request cancelled')
        } else if ((error as Error).name !== 'AbortError') {
          console.error('Station Status polling error: ', error)
        }
      }
    }

    checkStatus()

    intervalId = setInterval(checkStatus, intervalMs)

    return () => {
      if (intervalId) clearInterval(intervalId)
      if (abortController) abortController.abort()
    }
  }, [intervalMs, enabled])

  return status
}
