import 'server-only'

import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

import { profileFormSchema, UserProfileValues } from '@/lib/user/user'

const USER_COOKIE = 'user'
export const setUserInfo = (user: UserProfileValues) => {
  cookies().set({
    name: USER_COOKIE,
    value: JSON.stringify(user),
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  })
}
export const getUserInfo = async () => {
  const cookie = cookies().get(USER_COOKIE)
  const user = cookie ? JSON.parse(cookie?.value) : null
  const parsedUser = profileFormSchema.safeParse(user)
  if (parsedUser.success) {
    return Promise.resolve(parsedUser.data)
  }

  return Promise.resolve({
    id: randomUUID(),
    username: '',
    fullName: '',
    avatar: '',
    lastRoom: '',
    theme: 'dark' as const,
    type: 'incognito' as const,
  })
}
