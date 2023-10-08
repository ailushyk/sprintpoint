import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteDeck, RelatedDeckModel, CompleteSeesion, RelatedSeesionModel } from "./index"

export const RoomModel = z.object({
  id: z.string(),
  name: z.string(),
  code: z.string(),
  deckId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteRoom extends z.infer<typeof RoomModel> {
  users: CompleteUser[]
  deck?: CompleteDeck | null
  sessions: CompleteSeesion[]
}

/**
 * RelatedRoomModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoomModel: z.ZodSchema<CompleteRoom> = z.lazy(() => RoomModel.extend({
  users: RelatedUserModel.array(),
  deck: RelatedDeckModel.nullish(),
  sessions: RelatedSeesionModel.array(),
}))
