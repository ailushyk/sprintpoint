import * as z from "zod"
import { CompleteRoom, RelatedRoomModel, CompleteDeck, RelatedDeckModel, CompleteRound, RelatedRoundModel } from "./index"

export const SessionModel = z.object({
  id: z.string(),
  roomId: z.string(),
  deckId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteSession extends z.infer<typeof SessionModel> {
  room: CompleteRoom
  deck?: CompleteDeck | null
  rounds: CompleteRound[]
}

/**
 * RelatedSessionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedSessionModel: z.ZodSchema<CompleteSession> = z.lazy(() => SessionModel.extend({
  room: RelatedRoomModel,
  deck: RelatedDeckModel.nullish(),
  rounds: RelatedRoundModel.array(),
}))
