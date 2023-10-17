import { randomUUID } from 'crypto'
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid().nonempty().default(randomUUID),
  email: z.string().email().nullable().optional(),
  username: z.string().nullish(),
  avatar: z.string().optional(),
  theme: z
    .union([z.literal('light'), z.literal('dark')])
    .optional()
    .default('dark'),
  type: z.enum(['incognito', 'user']).default('incognito'),
})

export type UserProfileValues = z.infer<typeof UserSchema>
