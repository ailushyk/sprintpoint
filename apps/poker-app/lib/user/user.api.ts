import 'server-only'

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
export const getUserInfo = () => {
  const cookie = cookies().get(USER_COOKIE)
  const user = cookie ? JSON.parse(cookie?.value) : null
  const parsedUser = profileFormSchema.safeParse(user)
  if (parsedUser.success) {
    return parsedUser.data
  }

  return {
    username: '',
    fullName: '',
    avatar: '',
    lastRoom: '',
    theme: 'dark' as const,
    type: 'incognito' as const,
  }
}
