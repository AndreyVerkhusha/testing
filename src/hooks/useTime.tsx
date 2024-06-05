import { useEffect } from 'react'
import { useTimer } from 'react-timer-hook'

export const useTime = (expiryTimestamp?: Date) => {
  const { minutes, seconds, isRunning, restart, pause } = useTimer({
    expiryTimestamp: expiryTimestamp ? expiryTimestamp : new Date(),
  })

  useEffect(() => {
    restart(expiryTimestamp || new Date())
  }, [expiryTimestamp, restart])

  return { seconds, minutes, isRunning, pause }
}
