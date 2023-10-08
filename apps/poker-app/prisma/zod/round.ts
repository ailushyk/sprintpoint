import * as z from "zod"
import { CompleteSeesion, RelatedSeesionModel, CompleteVote, RelatedVoteModel } from "./index"

export const RoundModel = z.object({
  id: z.string(),
  order: z.number().int(),
  seesionId: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteRound extends z.infer<typeof RoundModel> {
  seesion?: CompleteSeesion | null
  votes: CompleteVote[]
}

/**
 * RelatedRoundModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRoundModel: z.ZodSchema<CompleteRound> = z.lazy(() => RoundModel.extend({
  seesion: RelatedSeesionModel.nullish(),
  votes: RelatedVoteModel.array(),
}))
