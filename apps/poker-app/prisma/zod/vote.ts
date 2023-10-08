import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteRound, RelatedRoundModel } from "./index"

export const VoteModel = z.object({
  id: z.string(),
  userId: z.string(),
  username: z.string(),
  cardName: z.string(),
  cardValue: z.number(),
  roundId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteVote extends z.infer<typeof VoteModel> {
  user: CompleteUser
  round?: CompleteRound | null
}

/**
 * RelatedVoteModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVoteModel: z.ZodSchema<CompleteVote> = z.lazy(() => VoteModel.extend({
  user: RelatedUserModel,
  round: RelatedRoundModel.nullish(),
}))
