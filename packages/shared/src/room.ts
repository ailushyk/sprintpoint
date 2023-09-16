import { z } from 'zod'

/**
 * @deprecated
 */
export const deprecated_roomStatusSchema = z
  .union([z.literal('idle'), z.literal('voting'), z.literal('checking')])
  .default('idle')

/**
 * @deprecated
 */
export const roomSchema = z.object({
  // id: z.string().nonempty().uuid(),
  code: z.string().nonempty(),
  name: z.string().optional(),
  deck: z.string().nonempty().default('standard'),
  status: deprecated_roomStatusSchema,
  users: z.array(z.string()).default([]),
  value: z.number().nullable().optional(),
  lastUpdate: z.string().datetime({ offset: true }),
})

export type RoomStatusValue = z.infer<typeof deprecated_roomStatusSchema>
export type RoomValue = z.infer<typeof roomSchema>
