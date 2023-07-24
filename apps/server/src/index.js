import { createServer } from 'http'
// import { instrument } from '@socket.io/admin-ui'
import express from 'express'
import { Server } from 'socket.io'

import { APP_PORT, CORS_ORIGIN } from '../config.js'
import { multiplayer } from './multiplayer.js'
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

const onConnection = (socket) => {
  ping(io, socket)
  multiplayer(io, socket)
}

io.on('connect', onConnection)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

httpServer.listen(APP_PORT)
