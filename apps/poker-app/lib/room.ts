import { RoomValue } from '@easypoker/shared'
import { roomSchema } from '@easypoker/shared/src'

// TODO: get room data from server
export const getRoom = (roomId: string): RoomValue => {
  const room = {
    code: roomId,
    name: '',
    deck: 'standard',
    users: [],
    status: 'idle',
    lastUpdate: new Date().toISOString(),
  }

  return roomSchema.parse(room)
}
