import { fetcher } from '@/lib/fetcher'
import { z } from 'zod'

const cardSchema = z.object({
  id: z.string(),
  title: z.string(),
  value: z.number().nullable(),
  order: z.number(),
})

export type Card = z.infer<typeof cardSchema>

export const fetchCardsByDeckSlug = async ({
  deckSlug,
}: {
  deckSlug: string
}) => {
  const raw = await fetcher(`/decks/${deckSlug}/cards`)
  return {
    ...raw,
    data: z.array(cardSchema).parse(raw.data),
  }
}
