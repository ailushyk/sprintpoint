'use server'

import { generateUniqueHash } from '@/lib/utils'

export const createRoom = async () => {
  return generateUniqueHash()
}
