import { z } from 'zod'

export const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Full name must be at least 2 characters.',
    })
    .optional()
    .default('@guest'),
  fullName: z.string().optional(),
  avatar: z.string().optional(),
  lastRoom: z.string().optional(),
  theme: z
    .enum(['light', 'dark'], {
      required_error: 'Please select a theme.',
    })
    .optional()
    .default('dark'),
  type: z.enum(['incognito', 'user']).default('incognito'),
})

export type UserProfileValues = z.infer<typeof profileFormSchema>
