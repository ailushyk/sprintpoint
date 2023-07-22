import 'server-only'

import { cookies } from 'next/headers'

import { profileFormSchema, ProfileValues } from '@/lib/user/user'

const USER_COOKIE = 'user'
export const setUserInfo = (user: ProfileValues) => {
  cookies().set({
    name: USER_COOKIE,
    value: JSON.stringify(user),
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
  })
}
export const getUserInfo = (): undefined | ProfileValues => {
  const cookie = cookies().get(USER_COOKIE)
  const user = cookie ? JSON.parse(cookie?.value) : {}
  return profileFormSchema.parse(user)
}
