import * as z from "zod"
import { CompleteRoom, RelatedRoomModel, CompleteDeck, RelatedDeckModel, CompleteRound, RelatedRoundModel } from "./index"

export const SeesionModel = z.object({
  id: z.string(),
  roomId: z.string(),
  deckId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSeesion extends z.infer<typeof SeesionModel> {
  room: CompleteRoom
  deck?: CompleteDeck | null
  rounds: CompleteRound[]
}

/**
 * RelatedSeesionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSeesionModel: z.ZodSchema<CompleteSeesion> = z.lazy(() => SeesionModel.extend({
  room: RelatedRoomModel,
  deck: RelatedDeckModel.nullish(),
  rounds: RelatedRoundModel.array(),
}))
