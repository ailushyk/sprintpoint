import { z } from 'zod'

export const socketDataSchema = z.object({
  id: z.string().uuid().nonempty(),
  username: z.string().nonempty(),
})

export type SocketDataValue = z.infer<typeof socketDataSchema>
