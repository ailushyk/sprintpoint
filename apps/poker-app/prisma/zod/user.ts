import * as z from "zod"
import { CompleteRoom, RelatedRoomModel, CompleteVote, RelatedVoteModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string().nullish(),
  username: z.string().nullish(),
  avatar: z.string().nullish(),
  type: z.string(),
  theme: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  rooms: CompleteRoom[]
  votes: CompleteVote[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  rooms: RelatedRoomModel.array(),
  votes: RelatedVoteModel.array(),
}))
