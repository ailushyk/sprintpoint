import { createServer } from 'http'
import express from 'express'
import { Server } from 'socket.io'

import {
  ClientToServerEvents,
  InterServerEvents,
  RoomValue,
  ServerToClientEvents,
  socketDataSchema,
  SocketDataValue,
  UserValue,
} from '@easypoker/shared'
import { VoteValue } from '@easypoker/shared/src'

import { APP_PORT, CORS_ORIGIN } from '../config.js'

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

let rooms: RoomValue[] = []
let users: Array<UserValue> = []
let votes: Array<VoteValue> = []

function getUsersWithVotes(roomId: string) {
  return users.map((u) => {
    let vote = votes.find((v) => v.userId === u.id && v.roomId === roomId)
    return {
      ...u,
      vote: vote,
    }
  })
}

io.use((socket, next) => {
  let data: SocketDataValue = {
    id: socket.handshake.auth.id,
    username: socket.handshake.auth.username,
  }
  const parse = socketDataSchema.safeParse(data)
  if (parse.success) {
    socket.data = parse.data
    next()
  } else {
    next(new Error(parse.error.message ?? 'invalid data'))
  }
})

const onConnection = (socket) => {
  socket.on('room:join', ({ room }: { room: string }) => {
    console.log('room:join', room)
    let _room = rooms.find((r) => r.code === room)
    // create room if not exists with user
    if (!_room) {
      rooms.push({
        users: [socket.data.id],
        code: room,
        deck: 'standard',
        status: 'voting',
        lastUpdate: new Date().toISOString(),
      })
      _room = rooms.find((r) => r.code === room)
    }

    // add user if not exists in users array
    if (!users.find((u) => u.id === socket.data.id)) {
      users.push({
        ...socket.data,
        status: 'idle',
        lastUpdate: new Date().toISOString(),
      })
    }

    // join room
    socket.join(room)

    // return room state to user
    socket.emit('room:joined', {
      room: _room,
    })
    // broadcast to room that user joined and return all users
    io.to(room).emit('users:all', { users: getUsersWithVotes(room) })
  })

  socket.on('room:check', ({ room }: { room: string }) => {
    io.to(room).emit('room:checking', {
      users: getUsersWithVotes(room),
    })
  })

  socket.on('user:vote', ({ value, room }: { value: number; room: string }) => {
    const _room = rooms.find((r) => r.code === room)
    if (!_room) {
      console.log('room not found')
      return
    }

    const user = users.find((u) => u.id === socket.data.id)
    if (!user) {
      console.log('user', socket.data.id, 'not found')
      console.log('all users', users)
      console.log('user not found')
      return
    }
    const vote = votes.find((v) => v.userId === user.id && v.roomId === room)
    if (!vote) {
      votes.push({
        userId: user.id,
        roomId: room,
        value,
        lastUpdate: new Date().toISOString(),
      })
    } else {
      votes = votes.map((v) =>
        v.userId === user.id && v.roomId === room
          ? { ...v, value, lastUpdate: new Date().toISOString() }
          : { ...v }
      )
    }
    io.to(room).emit('users:all', {
      users: getUsersWithVotes(room),
    })
  })

  socket.on('user:reset', ({ room }: { room: string }) => {
    votes = votes.filter(
      (v) => v.roomId !== room || v.userId !== socket.data.id
    )
    io.to(room).emit('users:all', { users: getUsersWithVotes(room) })
  })

  socket.on('room:reset', ({ room }: { room: string }) => {
    votes = votes.filter((v) => v.roomId !== room)
    io.to(room).emit('users:all', { users: getUsersWithVotes(room) })
  })

  // socket.on('user:status', (payload) => {
  //   api.updateUser(payload.room, {
  //     id: socket.data.id,
  //     // status: payload.status,
  //   })
  //   io.to(payload.room).emit('user:status', {
  //     user: {
  //       id: socket.data.id,
  //       username: socket.data.username,
  //       status: payload.status,
  //     },
  //   })
  // })

  // socket.on('user:vote', (payload) => {
  //   api.updateUser(payload.room, {
  //     id: socket.data.id,
  //     value: payload.value,
  //   })
  //   io.to(payload.room).emit('user:status', {
  //     user: {
  //       id: socket.data.id,
  //       username: socket.data.username,
  //       status: 'voted',
  //     },
  //   })
  // })

  // socket.on('disconnect', () => {
  //   socket.broadcast.emit('user:status', {
  //     user: {
  //       id: socket.data.id,
  //       username: socket.data.username,
  //       status: 'offline',
  //     },
  //   })
  // })
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
