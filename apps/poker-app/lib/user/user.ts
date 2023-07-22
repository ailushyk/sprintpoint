import { z } from 'zod'

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Full name must be at least 2 characters.',
    })
    .optional()
    .default('guest'),
  fullName: z
    .string()
    .min(2, {
      message: 'Full name must be at least 2 characters.',
    })
    .optional()
    .default('Player'),
  avatar: z.string().optional(),
  lastRoom: z.string().optional(),
  theme: z.string().optional().default('dark'),
  type: z.enum(['incognito', 'user']).default('incognito'),
})

export type ProfileValues = z.infer<typeof profileFormSchema>
