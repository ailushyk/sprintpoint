import { io, Socket } from 'socket.io-client'

import { ClientToServerEvents, ServerToClientEvents } from '@easypoker/shared'

const URL =
  process.env.NEXT_PUBLIC_WEB_SOCKET_API_URL ?? 'http://localhost:3000'

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false,
})

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export { socket }
