export interface ServerToClientEvents {
  pong: () => void
  users: (users: { id: string; username: string }[]) => void
  'user:connected': ({
    user,
    users,
  }: {
    user: SocketData
    users: SocketData[]
  }) => void
}

export interface ClientToServerEvents {
  ping: () => void
  pong: () => void
  disconnect: () => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  id: string
  username: string
  value?: number
}
