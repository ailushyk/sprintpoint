import { PlayStatusValue, SocketDataValue } from './socket'
import { UserValue, VoteValue } from './user'

export type AllUsersResponse = Array<UserValue & { vote?: VoteValue }>

export interface ServerToClientEvents {
  // Play Area
  'users:all': ({ users }: { users: AllUsersResponse }) => void
  'room:checking': (data: { users: AllUsersResponse }) => void
  'user:reset': () => void
}

export interface ClientToServerEvents {
  ping: () => void
  pong: () => void
  disconnect: () => void
  // Play Area
  'room:join': (payload: { room: string }) => void
  'user:status': (payload: { status: PlayStatusValue; room: string }) => void
  'user:voting': (payload: { room: string }) => void
  'user:vote': (payload: { value: number; room: string }) => void
  // TODO: ??
  'user:reset': () => void
}

export interface InterServerEvents {
  ping: () => void
}
