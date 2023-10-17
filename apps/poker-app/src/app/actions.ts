'use server'

import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

import { api } from '@/lib/api/api'
import { UserProfileValues } from '@/lib/api/api-types'
import { session } from '@/lib/api/session'
import { generateUniqueHash } from '@/lib/utils'

const generateRoom = () => ({
  code: generateUniqueHash(),
  name: '',
})

export const createRoom = async (data: FormData) => {
  const user = await session.user.getOrCreateIncognito()
  const deckId = data.get('deck') as string
  const room = await api().room.create(generateRoom(), user.id, deckId)
  redirect(`/room/${room.code}`, RedirectType.push)
}

export const joinRoom = async (code: string) => {
  redirect(`/room/${code}`, RedirectType.push)
}

export const updateUserInfoAction = async (user: UserProfileValues) => {
  return api().user.set(user)
}
