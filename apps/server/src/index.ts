import { createServer } from 'http'
import express from 'express'
import { Server, Socket } from 'socket.io'

import {
  ClientToServerEvents,
  getClosestValue,
  InterServerEvents,
  RoomValue,
  ServerToClientEvents,
  socketDataSchema,
  SocketDataValue,
  UserValue,
  VoteValue,
} from '@easypoker/shared'

import { api } from './api'
import { APP_PORT, CORS_ORIGIN } from './config'

const app = express()
const httpServer = createServer(app)
type ClientSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketDataValue
>

export const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketDataValue
>(httpServer, {
  cors: {
    origin: CORS_ORIGIN.split(','),
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
  const room = rooms.find((r) => r.code === roomId)
  if (!room) {
    console.error(new Error(`room ${roomId} not found`))
    return []
  }

  return users
    .filter((u) => room.users.includes(u.id))
    .map((u) => {
      let vote = votes.find((v) => v.userId === u.id && v.roomId === roomId)
      if (!vote) {
        vote = {
          userId: u.id,
          roomId: roomId,
          value: null,
          status: 'idle',
          lastUpdate: new Date().toISOString(),
        }
        votes.push(vote)
      }
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

function handleRoomJoin(socket: ClientSocket) {
  return ({ room }: { room: string }) => {
    console.log('room:join', room)
    let _room = rooms.find((r) => r.code === room)
    // settings room if not exists with user
    if (!_room) {
      rooms.push({
        users: [socket.data.id],
        code: room,
        deck: 'standard',
        status: 'voting',
        lastUpdate: new Date().toISOString(),
      })
      _room = rooms.find((r) => r.code === room)
    } else {
      // add user to room if not exists
      if (!_room?.users.includes(socket.data.id)) {
        _room.users.push(socket.data.id)
      }
    }

    // add user if not exists in users array
    if (!users.find((u) => u.id === socket.data.id)) {
      users.push({
        ...socket.data,
        status: 'idle',
        lastUpdate: new Date().toISOString(),
      })
    } else {
      users = users.map((u) => {
        if (u.id === socket.data.id) {
          return {
            ...u,
            status: 'idle',
            lastUpdate: new Date().toISOString(),
          }
        }
        return u
      })
    }

    // join room
    socket.join(room)

    // return room state to user
    socket.emit('room:joined', {
      room: _room as RoomValue,
    })
    // broadcast to room that user joined and return all users
    io.to(room).emit('users:all', { users: getUsersWithVotes(room) })
  }
}

async function handleRoomCheck({ room }: { room: string }) {
  // get deck
  const deckName = rooms.find((r) => r.code === room)?.deck
  if (!deckName) {
    console.error(new Error(`deck for room ${room} not found`))
    return
  }
  const deck = await api().deck.getAdvanced(deckName)

  // get all votes and calculate result
  const _votes = votes.filter((v) => v.roomId === room && v.value !== null)
  const result = _votes.reduce((acc, curr) => {
    if (curr.value) {
      return acc + curr.value
    }
    return acc
  }, 0)

  // get closest value
  let _value: null | number = null
  if (_votes.length > 0) {
    const avg = result / _votes.length
    _value = getClosestValue(
      avg,
      deck.data.cards.map((card) => card.value)
    )
  }

  // set room status to checking
  rooms = rooms.map((r) =>
    r.code === room
      ? {
          ...r,
          status: 'checking',
          value: _value,
          lastUpdate: new Date().toISOString(),
        }
      : r
  )

  const _room = rooms.find((r) => r.code === room)
  if (!_room) {
    console.log('room not found')
    return
  }
  io.to(room).emit('room:checking', {
    room: _room,
    users: getUsersWithVotes(room),
  })

  // increment all checks count
  if (_votes.length > 0) {
    api().redis.addToAllChecks().then()
  }
}

function handleRoomReset({ room }: { room: string }) {
  // set room status to voting
  rooms = rooms.map((r) =>
    r.code === room
      ? {
          ...r,
          status: 'voting',
          lastUpdate: new Date().toISOString(),
        }
      : r
  )
  // reset votes for room
  votes = votes.map((v) =>
    v.roomId === room
      ? {
          ...v,
          value: null,
          status: 'idle',
          lastUpdate: new Date().toISOString(),
        }
      : v
  )
  const _room = rooms.find((r) => r.code === room)
  if (!_room) {
    console.log('room not found')
    return
  }
  io.to(room).emit('room:reset', { room: _room })
  io.to(room).emit('users:all', { users: getUsersWithVotes(room) })
}

function handleUserVote(socket: ClientSocket) {
  return ({ value, room }: { value: number | null; room: string }) => {
    const _room = rooms.find((r) => r.code === room)
    if (!_room) {
      console.log('room not found')
      return
    }

    const user = users.find((u) => u.id === socket.data.id)
    if (!user) {
      console.log('user not found')
      return
    }

    users = users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          status: 'voting',
          lastUpdate: new Date().toISOString(),
        }
      }
      return u
    })

    const status = value === null ? 'voting' : 'voted'
    const vote = votes.find((v) => v.userId === user.id && v.roomId === room)
    if (!vote) {
      votes.push({
        userId: user.id,
        roomId: room,
        value,
        status,
        lastUpdate: new Date().toISOString(),
      })
    } else {
      votes = votes.map((v) =>
        v.userId === user.id && v.roomId === room
          ? {
              ...v,
              value,
              status,
              lastUpdate: new Date().toISOString(),
            }
          : { ...v }
      )
    }
    io.to(room).emit('users:all', {
      users: getUsersWithVotes(room),
    })
  }
}

function handleUserInactive(socket: ClientSocket) {
  return ({ room }: { room: string }) => {
    votes = votes.map((v) => {
      if (v.roomId === room && v.userId === socket.data.id) {
        return {
          ...v,
          status: 'idle',
          lastUpdate: new Date().toISOString(),
        }
      }
      return v
    })
    io.to(room).emit('users:all', { users: getUsersWithVotes(room) })
  }
}

function handleUserReset(socket: ClientSocket) {
  return ({ room }: { room: string }) => {
    // reset vote for user
    votes = votes.map((v) => {
      if (v.roomId === room && v.userId === socket.data.id) {
        return {
          ...v,
          value: null,
          status: 'idle',
          lastUpdate: new Date().toISOString(),
        }
      }
      return v
    })
    io.to(room).emit('users:all', { users: getUsersWithVotes(room) })
  }
}

const onConnection = (socket: ClientSocket) => {
  socket.on('disconnect', (reason) => {
    console.log('disconnect', reason)
    users = users.map((u) => {
      if (u.id === socket.data.id) {
        return {
          ...u,
          status: 'offline',
          lastUpdate: new Date().toISOString(),
        }
      }
      return u
    })

    // find all rooms with user
    rooms = rooms.map((r) => {
      if (r.users.includes(socket.data.id)) {
        io.to(r.code).emit('users:all', { users: getUsersWithVotes(r.code) })
        return {
          ...r,
          users: r.users.filter((u) => {
            if (u === socket.data.id) {
              const _u = users.find((_u) => _u.id === u)
              if (!_u) {
                return false
              }
              if (
                _u.lastUpdate <
                new Date(Date.now() - 1000 * 60 * 7).toISOString()
              ) {
                return false
              }
            }
            return true
          }),
        }
      }
      return r
    })
  })

  socket.on('room:join', handleRoomJoin(socket))

  socket.on('room:check', handleRoomCheck)

  socket.on('room:reset', handleRoomReset)

  socket.on('user:vote', handleUserVote(socket))

  socket.on('user:inactive', handleUserInactive(socket))

  socket.on('user:reset', handleUserReset(socket))
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
  res.send('<h1>easypoker server</h1>')
})

httpServer.listen(APP_PORT)
