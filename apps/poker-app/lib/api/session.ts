import 'server-only'

import { btoa } from 'buffer'
import { cookies } from 'next/headers'

import { api } from '@/lib/api/api'
import { UserProfileValues, UserSchema } from '@/lib/api/api-types'

export const USER_COOKIE = 'user'

export const session = {
  user: {
    set(user: UserProfileValues) {
      return cookies().set({
        name: USER_COOKIE,
        value: btoa(JSON.stringify(UserSchema.parse(user))),
        path: '/',
        sameSite: 'lax',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 12, // 1 year
        secure: process.env.NODE_ENV === 'production',
      })
    },
    get() {
      const cookie = cookies().get(USER_COOKIE)
      return cookie ? JSON.parse(atob(cookie.value)) : null
    },
    async getOrCreateIncognito() {
      const _user = this.get()
      /**
       * if get doesn't exist in db, clear local storage
       */
      if (_user) {
        const user = await api().user.get(_user.id)
        if (user) {
          session.user.set(user)
          return user
        } else {
          console.warn('user not found in db, clearing local storage')
          session.user.delete()
        }
      }

      const user = await api().user.create({
        data: createIncognitoUser(),
      })
      session.user.set(user)
      return user
    },
    delete() {
      return cookies().delete(USER_COOKIE)
    },
  },
}

function createIncognitoUser() {
  return {
    username: '',
    avatar: '',
    theme: 'dark',
    type: 'incognito',
  }
}
