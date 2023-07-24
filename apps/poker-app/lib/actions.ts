'use server'

import { api } from '@/lib/api'
import { UserProfileValues } from '@/lib/user/user'

export const updateUserInfoAction = async (user: UserProfileValues) => {
  api().user.set(user)
}

export const updateThemeAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
