import * as z from "zod"
import { CompleteRoom, RelatedRoomModel, CompleteCard, RelatedCardModel, CompleteSeesion, RelatedSeesionModel } from "./index"

export const DeckModel = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteDeck extends z.infer<typeof DeckModel> {
  rooms: CompleteRoom[]
  cards: CompleteCard[]
  seesions: CompleteSeesion[]
}

/**
 * RelatedDeckModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedDeckModel: z.ZodSchema<CompleteDeck> = z.lazy(() => DeckModel.extend({
  rooms: RelatedRoomModel.array(),
  cards: RelatedCardModel.array(),
  seesions: RelatedSeesionModel.array(),
}))
