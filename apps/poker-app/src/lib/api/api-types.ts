import { randomUUID } from 'crypto'
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid().nonempty(),
  email: z.string().email().nullish(),
  username: z.string().nullish(),
  avatar: z.string().nullish(),
  theme: z
    .union([z.literal('light'), z.literal('dark')])
    .nullish()
    .default('dark'),
  type: z.enum(['incognito', 'user']).default('incognito'),
})

export type UserProfileValues = z.infer<typeof UserSchema>
