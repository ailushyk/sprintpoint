import { createServer } from 'http'
// import { instrument } from '@socket.io/admin-ui'
import express from 'express'
import { Server } from 'socket.io'

import { APP_PORT, CORS_ORIGIN } from '../config.js'
import { ping } from './ping.js'

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
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
  const username = socket.handshake.auth.username
  if (!username) {
    return next(new Error('invalid username'))
  }
  socket.username = username
  next()
})

const onConnection = (socket) => {
  ping(io, socket)
  // multiplayer(io, socket)

  const users = []
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      userID: id,
      username: socket.username,
    })
  }
  socket.emit('users', users)
}

io.on('connect', onConnection)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

httpServer.listen(APP_PORT)
