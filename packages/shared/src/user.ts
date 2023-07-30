import { z } from 'zod'

import { playStatusSchema } from './socket'

export const userSchema = z.object({
  id: z.string().uuid().nonempty(),
  username: z.string().nonempty(),
  status: playStatusSchema,
  lastUpdate: z.string().datetime(),
})

export const voteSchema = z.object({
  userId: z.string().uuid().nonempty(),
  roomId: z.string().uuid().nonempty(),
  value: z.number().nullable().optional(),
  lastUpdate: z.string().datetime(),
})

export type UserValue = z.infer<typeof userSchema>
export type VoteValue = z.infer<typeof voteSchema>
