import 'server-only'

import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

import { profileFormSchema, UserProfileValues } from '@/lib/user/user'

const USER_COOKIE = 'user'
export async function setUserInfo(user: UserProfileValues) {
  cookies().set({
    name: USER_COOKIE,
    value: JSON.stringify(user),
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30 * 12, // 1 year
    secure: process.env.NODE_ENV === 'production',
  })
}

function createUser() {
  const newUser: UserProfileValues = {
    id: randomUUID(),
    username: '',
    fullName: '',
    avatar: '',
    lastRoom: '',
    theme: 'dark',
    type: 'incognito',
  }
  return newUser
}

export async function getUserInfo() {
  const cookie = cookies().get(USER_COOKIE)
  const user = cookie ? JSON.parse(cookie?.value) : null
  const parsedUser = profileFormSchema.safeParse(user)

  const data = parsedUser.success ? parsedUser.data : createUser()

  return Promise.resolve(data)
}
