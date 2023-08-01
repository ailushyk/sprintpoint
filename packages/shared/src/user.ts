import { z } from 'zod'

export const playStatusSchema = z
  .union([
    z.literal('idle'),
    z.literal('offline'),
    z.literal('on-hold'),
    z.literal('voting'),
    z.literal('voted'),
  ])
  .default('idle')

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
  status: playStatusSchema,
  lastUpdate: z.string().datetime(),
})

export type PlayStatusValue = z.infer<typeof playStatusSchema>
export type UserValue = z.infer<typeof userSchema>
export type VoteValue = z.infer<typeof voteSchema>
