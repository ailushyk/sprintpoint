import 'server-only'

import { cookies } from 'next/headers'

import { profileFormSchema, UserProfileValues } from '@/lib/user/user'

const USER_COOKIE = 'user'
export function setUserCookies(user: UserProfileValues) {
  return cookies().set({
    name: USER_COOKIE,
    value: JSON.stringify(user),
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 * 12, // 1 year
    secure: process.env.NODE_ENV === 'production',
  })
}

export function createUser() {
  return {
    username: '',
    avatar: '',
    theme: 'dark',
    type: 'incognito',
  }
}

export function getUserFromCookies() {
  const cookie = cookies().get(USER_COOKIE)
  const user = cookie ? JSON.parse(cookie?.value) : null
  const parsedUser = profileFormSchema.safeParse(user)

  return parsedUser.success ? parsedUser.data : user
}

export function clearUserCookies() {
  return cookies().delete(USER_COOKIE)
}
