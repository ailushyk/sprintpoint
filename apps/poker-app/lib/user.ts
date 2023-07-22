import { cookies } from 'next/headers'
import { z } from 'zod'

const USER_COOKIE = 'user'

const userSchema = z.object({
  username: z.string().optional().default('guest'),
  fullName: z.string().optional().default('Player'),
  avatar: z.string().optional(),
  lastRoom: z.string().optional(),
  theme: z.string().optional().default('dark'),
  type: z.enum(['incognito', 'user']).default('incognito'),
})

type UserValue = z.infer<typeof userSchema>

export const setUserInfo = (user: UserValue) => {
  cookies().set({
    name: USER_COOKIE,
    value: JSON.stringify(user),
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  })
}

export const getUserInfo = (): undefined | UserValue => {
  const cookie = cookies().get(USER_COOKIE)
  const user = cookie ? JSON.parse(cookie?.value) : {}
  return userSchema.parse(user)
}
