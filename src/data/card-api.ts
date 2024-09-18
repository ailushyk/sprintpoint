import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

const cardSchema = z.object({
  title: z.string(),
  value: z.string().nullable(),
  order: z.number(),
})

export const fetchCardsByDeckSlug = async (deckSlug: string) => {
  const { data } = await fetcher(`/decks/${deckSlug}/cards`)
  return z.array(cardSchema).parse(data)
}
