'use server'

import { revalidatePath } from 'next/cache'

import { api } from '@/lib/api'
import { UserProfileValues } from '@/lib/user/user'

export const updateUserInfoAction = async (user: UserProfileValues) => {
  api().user.set(user)
  revalidatePath('/room/[room]')
}

export const updateThemeAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
