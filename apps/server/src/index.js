import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { ping } from './ping.js'
import { APP_PORT, CORS_ORIGIN } from '../config.js'
import { multiplayer } from './multiplayer.js'

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

const onConnection = (socket) => {
  ping(io, socket)
  multiplayer(io, socket)
}

io.on('connect', onConnection)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

httpServer.listen(APP_PORT)
