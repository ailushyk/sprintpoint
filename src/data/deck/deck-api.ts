import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

const deckSchema = z.object({
  name: z.string(),
  slug: z.string(),
})

export const fetchAllDecks = async () => {
  const result = await fetcher('/api/sprintpoint/decks')
  const data = z.array(deckSchema).parse(result.data)
  return {
    ...result,
    data,
  }
}
