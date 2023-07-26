import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '@easypoker/shared'
import { socketDataSchema } from '@easypoker/shared/dist'
import { toast } from '@easypoker/ui'

const URL =
  process.env.NEXT_PUBLIC_WEB_SOCKET_API_URL ?? 'http://localhost:3000'

export const usersSchema = socketDataSchema.array()

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false,
})

// socket.onAny((event, ...args) => {
//   console.log('-------------------🔽')
//   console.log('socket event')
//   console.log(event, args)
//   console.log('-------------------🔼')
// })

socket.on('connect', () => {
  console.log('socket connected')
})

socket.on('disconnect', () => {
  console.log('socket disconnected')
})

socket.emit('ping')

socket.on('connect_error', (err) => {
  if (err.message === 'invalid username') {
    toast({
      title: err.name,
      description: err.message,
    })
    console.error(err)
  }
})

export { socket }
