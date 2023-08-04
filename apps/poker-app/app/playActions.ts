'use server'

import { generateUniqueHash } from '@/lib/utils'

// TODO: check if room exists
export const createRoom = async () => {
  const room = generateUniqueHash()
  await new Promise((resolve) => setTimeout(resolve, 500))
  return room
}
