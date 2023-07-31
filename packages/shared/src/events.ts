import { RoomValue } from './room'
import { PlayStatusValue, SocketDataValue } from './socket'
import { UserValue, VoteValue } from './user'

export type UserResponse = UserValue & { vote?: VoteValue }
export type AllUsersResponse = Array<UserResponse>

export interface ServerToClientEvents {
  // Play Area
  'room:joined': (data: { room: RoomValue }) => void
  'users:all': ({ users }: { users: AllUsersResponse }) => void
  'room:checking': (data: { users: AllUsersResponse }) => void
  'user:reset': () => void
}

export interface ClientToServerEvents {
  disconnect: () => void
  // Play Area
  'room:join': (payload: { room: string }) => void
  'room:check': (payload: { room: string }) => void
  'room:reset': (payload: { room: string }) => void
  'user:vote': (payload: { value: number; room: string }) => void
  'user:reset': (payload: { room: string }) => void
  // 'user:status': (payload: { status: PlayStatusValue; room: string }) => void
  // 'user:voting': (payload: { room: string }) => void
}

export interface InterServerEvents {
  ping: () => void
}
