import io from 'socket.io-client'

import { EventBusType } from '../types'

const SERVER = process.env.REACT_APP_SOCKET_SERVER

if (!SERVER) {
  throw new Error('REACT_APP_SOCKET_SERVER env must be declared')
}

export const socket = io(SERVER, {
  autoConnect: false,
  withCredentials: true,
})

const socketio: EventBusType = {
  connected: socket.connected,

  disconnected: socket.disconnected,

  connect: () => {
    socket.connect()
  },

  disconnect: () => {
    socket.close()
  },

  on: (event, listener) => {
    socket.on(event, listener)
  },

  once: (event, listener) => {
    socket.once(event, listener)
  },

  emit: (event, params) => {
    socket.emit(event, params)
  },

  emitLast: (event, params) => {
    socket.volatile.emit(event, params)
  },

  off: (event?) => {
    if (event) {
      socket.off(event)
    } else {
      socket.offAny()
    }
  },
}

export default socketio
