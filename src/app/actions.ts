'use server'

import { auth } from '@/lib/auth/auth'

export const startSessionAction = async () => {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  console.log('Starting new session')
}
