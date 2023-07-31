import { z } from 'zod'

export const roomStatusSchema = z
  .union([z.literal('voting'), z.literal('checking')])
  .default('voting')

export const roomSchema = z.object({
  // id: z.string().nonempty().uuid(),
  code: z.string().nonempty(),
  name: z.string().optional(),
  deck: z.string().nonempty().default('standard'),
  status: roomStatusSchema,
  users: z.array(z.string()).default([]),
  value: z.number().nullable().optional(),
  lastUpdate: z.string().datetime({ offset: true }),
})

export type RoomStatusValue = z.infer<typeof roomStatusSchema>
export type RoomValue = z.infer<typeof roomSchema>
