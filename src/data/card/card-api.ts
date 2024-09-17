import { cardSchema } from '@/data/card/card-schema'
import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

export const fetchCardsByDeckSlug = async (deckSlug: string) => {
  const { data } = await fetcher(`/api/sprintpoint/decks/${deckSlug}/cards`)
  return z.array(cardSchema).parse(data)
}
