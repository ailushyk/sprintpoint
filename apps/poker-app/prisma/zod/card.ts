import * as z from "zod"
import { CompleteDeck, RelatedDeckModel } from "./index"

export const CardModel = z.object({
  id: z.string(),
  name: z.string(),
  value: z.number(),
  deckId: z.string(),
  order: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteCard extends z.infer<typeof CardModel> {
  deck: CompleteDeck
}

/**
 * RelatedCardModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCardModel: z.ZodSchema<CompleteCard> = z.lazy(() => CardModel.extend({
  deck: RelatedDeckModel,
}))
