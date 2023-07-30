import { randomUUID } from 'crypto'

import { RoomValue, UserValue } from '@easypoker/shared'

// type RoomsApi = {
//   all: Array<RoomValue>
//   setRoom: (room: RoomValue) => void
//   getRoom: (id: string) => RoomValue | undefined
// }

const allRooms: Array<RoomValue> = []

const api = {
  setRoom: (room: RoomValue) => {
    const index = allRooms.findIndex((r) => r.id === room.id)
    if (index === -1) {
      allRooms.push(room)
    } else {
      allRooms[index] = room
    }
    return room
  },
  getRoom: (code: string) => {
    return allRooms.find((r) => r.code === code)
  },
  getUsers: (roomId: string) => {
    const room = api.getRoom(roomId)
    if (!room) {
      return []
    }
    return room.users
  },
  addUser: (roomId: string, user: UserValue) => {
    let room = api.getRoom(roomId)

    if (!room) {
      room = api.setRoom({
        id: randomUUID(),
        name: null,
        code: roomId,
        users: [],
        deck: 'standard',
        value: null,
        status: 'voting',
        lastUpdate: new Date().toISOString(),
      })
    }
    // check if user is already in room
    const userIndex = room.users.findIndex((userId) => userId === user.id)
    if (userIndex === -1) {
      room.users.push(user.id)
    }
  },
  updateUser: (roomId: string, user: Partial<UserValue>) => {
    const room = api.getRoom(roomId)
    if (!room) {
      return
    }
    const userIndex = room.users.findIndex((u) => u.id === user.id)
    if (userIndex === -1) {
      return
    }
    room.users[userIndex] = { ...room.users[userIndex], ...user }
  },
}

export { api }
