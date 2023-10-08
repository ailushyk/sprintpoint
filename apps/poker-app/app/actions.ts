'use server'

import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

import { api } from '@/lib/api'
import prisma from '@/lib/prisma'
import { UserProfileValues } from '@/lib/user/user'
import { createUser } from '@/lib/user/user.api'
import { generateUniqueHash } from '@/lib/utils'

const generateRoom = () => ({
  code: generateUniqueHash(),
  name: '',
})

export const createRoom = async () => {
  let user = await api().user.get()
  if (!user) {
    const newUser = await prisma.user.create({
      data: createUser(),
    })
    await api().user.set(newUser)
    user = newUser
  }
  const room = await api().room.create(generateRoom(), user.id)
  redirect(`/room/${room.code}`, RedirectType.push)
}

export const updateUserInfoAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
export const updateThemeAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
