'use server'

import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

import { Room } from '@easypoker/shared/src/refactor-types'

import { api } from '@/lib/api'
import { generateUniqueHash } from '@/lib/utils'

const generateRoom = (): Room => ({
  code: generateUniqueHash(),
  name: '',
  users: [],
  status: 'idle',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  roundNumber: 0,
  maxPlayers: 0,
  deckType: 'standard',
})

// TODO: check if room exists
export const createRoom = async () => {
  const room = generateUniqueHash()
  await api().room.create(generateRoom())
  redirect(`/room/${room}`, RedirectType.push)
}
