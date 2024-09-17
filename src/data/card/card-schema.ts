import { z } from 'zod'
export const cardSchema = z.object({
  title: z.string(),
  value: z.string().nullable(),
  order: z.number(),
})
