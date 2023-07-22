'use server'

import { api } from '@/lib/api'
import { ProfileValues } from '@/lib/user/user'

export const updateUserInfoAction = async (user: ProfileValues) => {
  return api().user.set(user)
}

export const updateThemeAction = async (user: ProfileValues) => {
  return api().user.set(user)
}
