import { deckSchema } from '@/data/deck-api'
import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

const sessionSchema = z.object({
  id: z.string(),
  deck: z.object(deckSchema.shape),
  createdBy: z.string(),
  createdAt: z.string(),
})

export const fetchUserSessions = async () => {
  const response = await fetcher('/sessions')
  return {
    ...response,
    data: z.array(sessionSchema).parse(response.data),
  }
}

export const fetchSessionById = async (sessionId: string) => {
  const session = await fetcher(`/sessions/${sessionId}`)
  return {
    ...session,
    data: sessionSchema.parse(session.data),
  }
}
