import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

const deckSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
})

export const fetchAllDecks = async () => {
  const result = await fetcher('/decks')
  const data = z.array(deckSchema).parse(result.data)
  return {
    ...result,
    data,
  }
}
