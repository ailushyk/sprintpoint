'use server'

import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

import { Room } from '@easypoker/shared/src/refactor-types'

import { api } from '@/lib/api'
import prisma from '@/lib/prisma'
import { createUser } from '@/lib/user/user.api'
import { generateUniqueHash } from '@/lib/utils'

const generateRoom = (): Partial<Room> => ({
  code: generateUniqueHash(),
  name: '',
  status: 'idle',
  roundNumber: 0,
  deckType: 'standard',
})

export const createRoom = async () => {
  const user = await api().user.get()
  if (!user) {
    const newUser = await prisma.user.create({
      data: createUser(),
    })
    await api().user.set(newUser)
  }
  const room = generateUniqueHash()
  await api().room.create(generateRoom())
  redirect(`/room/${room}`, RedirectType.push)
}
