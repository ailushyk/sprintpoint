import React, { ReactNode } from 'react'
import { Socket } from 'socket.io-client'

const SocketContext = React.createContext<{
  socket: Socket
  isConnected: boolean
}>(null!)
export function SocketProvider(props: { children: ReactNode }) {
  return (
    <SocketContext.Provider
      value={{
        socket: null!,
        isConnected: false,
      }}
    >
      {props.children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const context = React.useContext(SocketContext)
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider')
  }
  return context
}
