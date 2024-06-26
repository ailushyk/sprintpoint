'use server'

import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { api } from '@/lib/api/api'
import { UserProfileValues, UserSchema } from '@/lib/api/api-types'
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

export const updateUserProfileAction = async (
  prevState: UserProfileValues,
  data: FormData
) => {
  const validator = UserSchema.extend({
    username: z.string().min(2),
  })
  const _data = Object.fromEntries(data.entries())
  const user = {
    ...(await session.user.getOrCreateIncognito()),
    ..._data,
  }

  const safeParse = await validator.safeParseAsync(user)
  if (safeParse.success) {
    return await api().user.set(safeParse.data)
  }
  return { errors: JSON.stringify(safeParse.error) }
}
