import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '@easypoker/shared'
import { toast } from '@easypoker/ui'

const URL =
  process.env.NEXT_PUBLIC_WEB_SOCKET_API_URL ?? 'http://localhost:3000'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false,
})

socket.onAny((event, ...args) => {
  console.log(event, args)
})

socket.on('connect_error', (err) => {
  if (err.message === 'invalid username') {
    toast({
      title: err.name,
      description: err.message,
    })
    console.error(err)
  }
})

socket.on('connect', () => {
  console.log('socket connected')
  console.log(socket.id)
})

socket.on('disconnect', () => {
  console.log('socket disconnected')
})

export { socket }
