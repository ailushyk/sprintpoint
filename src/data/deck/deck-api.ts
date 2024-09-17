import { deckSchema } from '@/data/deck/deck-schema'
import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

export const fetchAllDecks = async () => {
  const { data } = await fetcher('/api/sprintpoint/decks')
  return z.array(deckSchema).parse(data)
}
