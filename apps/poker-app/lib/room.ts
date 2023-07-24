import { randomUUID } from 'crypto'
import { z } from 'zod'

const roomSchema = z.object({
  id: z.string().nonempty().uuid(),
  code: z.string().nonempty(),
  name: z.string().optional(),
  deck: z.string().nonempty().default('standard'),
  users: z.array(z.string()),
})

export type RoomValue = z.infer<typeof roomSchema>

// TODO: get room data from server
export const getRoom = (roomId: string): RoomValue => {
  return {
    id: randomUUID(),
    code: roomId,
    name: 'work-in-progress',
    deck: 'standard',
    users: [],
  }
}
