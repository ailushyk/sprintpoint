'use server'

import { auth } from '@/lib/auth/auth'
import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

const newSessionSchema = z.object({
  deckId: z.string(),
})

export const startSessionAction = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  try {
    const bodyRequest = newSessionSchema.parse({
      deckId: formData.get('deckId'),
    })
    const result = await fetcher('/sessions', {
      method: 'POST',
      body: JSON.stringify(bodyRequest),
    })
    console.log('Session created:', result)
  } catch (error) {
    console.error('Failed to create session:', error)
  }

  // return the session

  // redirect to the new session
}
