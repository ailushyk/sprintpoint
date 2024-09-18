'use server'

import { auth } from '@/lib/auth/auth'
import { fetcher } from '@/lib/fetcher'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const newSessionSchema = z.object({
  deckId: z.string(),
})

export const startSessionAction = async (formData: FormData) => {
  const session = await auth()
  if (!session) {
    throw new Error('Unauthorized')
  }

  const bodyRequest = newSessionSchema.parse({
    deckId: formData.get('deckId'),
  })
  const result = await fetcher<{ id: string }>('/sessions', {
    method: 'POST',
    body: JSON.stringify(bodyRequest),
  })
  redirect(`/s/${result.data.id}`)
}
