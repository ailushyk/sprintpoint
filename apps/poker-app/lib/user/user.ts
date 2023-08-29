import { randomUUID } from 'crypto'
import { z } from 'zod'

export const profileFormSchema = z.object({
  id: z.string().uuid().nonempty().default(randomUUID),
  username: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  fullName: z.string().optional(),
  avatar: z.string().optional(),
  lastRoom: z.string().optional(),
  theme: z
    .union([z.literal('light'), z.literal('dark')])
    .optional()
    .default('dark'),
  type: z.enum(['incognito', 'user']).default('incognito'),
})

export type UserProfileValues = z.infer<typeof profileFormSchema>
