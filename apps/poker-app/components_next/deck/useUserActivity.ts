import { useEffect, useRef } from 'react'

import { socket } from '@/lib/socket-client'
import { useOnlineContext } from '@/app/room/[room]/_components/online-provider'

export const useUserActivity = () => {
  const timer = useRef<NodeJS.Timer>(null!)
  const {
    state: { room },
  } = useOnlineContext()

  function handleUserActivity() {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      console.log('user is inactive')
      socket.emit('user:inactive', { room: room.code })
    }, 7000)
  }

  function resetUserActivity() {
    clearTimeout(timer.current)
  }

  useEffect(() => {
    return () => {
      resetUserActivity()
    }
  }, [room.code])

  return {
    handleUserActivity,
    resetUserActivity,
  }
}
