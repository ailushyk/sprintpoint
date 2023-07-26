import { z } from 'zod'

export const playStatusSchema = z
  .union([
    z.literal('idle'),
    z.literal('offline'),
    // z.literal('ready'),
    z.literal('on-hold'),
    z.literal('voting'),
    z.literal('voted'),
  ])
  .default('idle')

export const socketDataSchema = z.object({
  id: z.string().uuid().nonempty(),
  username: z.string().nonempty(),
  value: z.number().nullable().optional(),
  status: playStatusSchema,
})

export type PlayStatusValue = z.infer<typeof playStatusSchema>
export type SocketDataValue = z.infer<typeof socketDataSchema>
// export type SocketDataValue = {
//   id: string
//   username: string
//   status: PlayStatusValue
//   value?: number
// }

export interface ServerToClientEvents {
  pong: () => void
  // Play Area
  'users:all': (
    users: { id: string; username: string; status: PlayStatusValue }[]
  ) => void
  'users:votes': (
    users: { id: string; username: string; value: number }[]
  ) => void
  'user:status': (data: {
    user: {
      id: string
      username: string
      status: PlayStatusValue
    }
  }) => void

  /**
   * @deprecated
   */
  users: (users: { id: string; username: string }[]) => void
  /**
   * @deprecated
   */
  'user:connected': ({
    user,
    users,
  }: {
    user: SocketDataValue
    users: SocketDataValue[]
  }) => void
}

export interface ClientToServerEvents {
  ping: () => void
  pong: () => void
  disconnect: () => void
  // Play Area
  'user:status': (status: PlayStatusValue) => void
  'user:voting': () => void
  'user:vote': (value: number) => void
  // TODO: ??
  'user:reset': () => void
}

export interface InterServerEvents {
  ping: () => void
}
