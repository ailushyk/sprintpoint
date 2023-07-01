import React, { FC, useEffect, useState } from 'react'
import socketio from './socket/socketio'
import { EventBusContextType, EventBusType } from './types'
import { EventBusContext } from './EventBusContext'

/**
 * gunjs
 * socket.io
 */
const provider: EventBusType = socketio

interface Props {
  children: React.ReactNode
}

export const EventBusProvider: FC<Props> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    provider.on('connect', () => {
      setIsConnected(true)
    })

    provider.on('disconnect', () => {
      setIsConnected(false)
    })

    return () => {
      provider.off()
    }
  }, [])

  const value: EventBusContextType = {
    isConnected,
    provider,
  }

  return (
    <EventBusContext.Provider value={value}>
      {children}
    </EventBusContext.Provider>
  )
}
