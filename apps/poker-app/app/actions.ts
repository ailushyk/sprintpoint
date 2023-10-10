'use server'

import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

import { api } from '@/lib/api/api'
import { UserProfileValues } from '@/lib/user/user'
import { createUser } from '@/lib/user/user.api'
import { generateUniqueHash } from '@/lib/utils'

const generateRoom = () => ({
  code: generateUniqueHash(),
  name: '',
})

const getUser = async () => {
  const user = await api().user.get()
  /**
   * if user doesn't exist in db, clear local storage
   */
  if (user) {
    const userDb = await api().user.getById(user.id)
    if (userDb) {
      return userDb
    } else {
      api().user.clear()
    }
  }

  const newUser = await api().user.create({
    data: createUser(),
  })
  await api().user.set(newUser)
  return newUser
}

export const createRoom = async (data: FormData) => {
  const user = await getUser()
  const deckId = data.get('deck') as string
  const room = await api().room.create(generateRoom(), user.id, deckId)
  redirect(`/room/${room.code}`, RedirectType.push)
}

export const joinRoom = async (code: string) => {
  const user = await getUser()
  const room = await api().room.get(code)
  if (!room) {
    throw new Error('Room not found')
  }
  await api().room.join({
    roomId: room.id,
    userId: user.id,
  })
  redirect(`/room/${room.code}`, RedirectType.push)
}

export const updateUserInfoAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
export const updateThemeAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
