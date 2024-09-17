import { z } from 'zod'

export const deckSchema = z.object({
  name: z.string(),
  slug: z.string(),
})
