'use server'

import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

import { api } from '@/lib/api/api'
import prisma from '@/lib/prisma'
import { UserProfileValues } from '@/lib/user/user'
import { createUser } from '@/lib/user/user.api'
import { generateUniqueHash, sleep } from '@/lib/utils'

const generateRoom = () => ({
  code: generateUniqueHash(),
  name: '',
})

export const createRoom = async (data: FormData) => {
  let userId: string | null = null
  const user = await api().user.get()
  const deckId = data.get('deck') as string

  /**
   * if user doesn't exist in db, clear local storage
   */
  if (user) {
    const userDb = await api().user.getById(user.id)
    if (userDb) {
      userId = userDb.id
    } else {
      api().user.clear()
      userId = null
    }
  }

  if (!userId) {
    const newUser = await prisma.user.create({
      data: createUser(),
    })
    await api().user.set(newUser)
    userId = newUser.id
  }

  const room = await api().room.create(generateRoom(), userId!, deckId)
  redirect(`/room/${room.code}`, RedirectType.push)
}

export const updateUserInfoAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
export const updateThemeAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
