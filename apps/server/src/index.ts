import { createServer } from 'http'
// import { instrument } from '@socket.io/admin-ui'
import express from 'express'
import { Server } from 'socket.io'

import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from '@easypoker/shared'

import { APP_PORT, CORS_ORIGIN } from '../config.js'
import { ping } from './ping.js'

const app = express()
const httpServer = createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
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
  const userId = socket.handshake.auth.id
  const username = socket.handshake.auth.username
  if (!userId) {
    return next(new Error('invalid userId'))
  }

  if (!username) {
    return next(new Error('invalid username'))
  }

  socket.data.id = userId
  socket.data.username = username
  next()
})

const onConnection = (socket) => {
  ping(io, socket)
  // multiplayer(io, socket)
  let users: SocketData[] = []
  io.of('/').sockets.forEach((socket) => {
    console.log(socket.id)
    users.push({
      id: socket.data.id,
      username: socket.data.username,
      value: null,
    })
  })
  socket.emit('users', users)

  socket.broadcast.emit('user:connected', {
    user: {
      id: socket.data.id,
      username: socket.data.username,
    },
    users,
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
