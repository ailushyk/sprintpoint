import { createServer } from 'http'
// import { instrument } from '@socket.io/admin-ui'
import express from 'express'
import { Server } from 'socket.io'

import {
  ClientToServerEvents,
  InterServerEvents,
  PlayStatusValue,
  ServerToClientEvents,
  socketDataSchema,
  SocketDataValue,
} from '@easypoker/shared'

import { APP_PORT, CORS_ORIGIN } from '../config.js'
import { ping } from './ping.js'

const app = express()
const httpServer = createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketDataValue
>(httpServer, {
  cors: {
    origin: CORS_ORIGIN,
    credentials: true,
  },
  cookie: {
    name: 'easy-poker',
    httpOnly: true,
    maxAge: 86400,
    // secure: true
    path: '/',
    sameSite: 'lax',
  },
})

// instrument(io, {
//   auth: false,
//   mode: 'development',
// })

io.use((socket, next) => {
  let data: SocketDataValue = {
    id: socket.handshake.auth.id,
    username: socket.handshake.auth.username,
    status: 'idle',
  }
  const parse = socketDataSchema.safeParse(data)
  if (parse.success === true) {
    socket.data = parse.data
    next()
  } else {
    next(new Error(parse.error.message ?? 'invalid data'))
  }
})

const onConnection = (socket) => {
  ping(io, socket)
  // multiplayer(io, socket)

  // TODO: play area socket
  const users: Array<{
    id: string
    username: string
    status: PlayStatusValue
  }> = []
  io.of('/').sockets.forEach((socket) => {
    users.push({
      id: socket.data.id,
      username: socket.data.username,
      status: 'idle',
    })
  })

  io.emit('users:all', users)

  socket.on('disconnect', () => {
    socket.broadcast.emit('user:status', {
      user: {
        id: socket.data.id,
        username: socket.data.username,
        status: 'offline',
      },
    })
  })
}

io.on('connect', onConnection)

// io.on('disconnect', (socket) => {
//   console.log('disconnect')
//   socket.broadcast.emit('user:disconnected', {
//     user: {
//       id: socket.id,
//       username: socket.username,
//     },
//   })
// })

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

httpServer.listen(APP_PORT)
