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
})

export type PlayStatusValue = z.infer<typeof playStatusSchema>
export type SocketDataValue = z.infer<typeof socketDataSchema>
