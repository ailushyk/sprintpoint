import { z } from 'zod'

export * from './events'
export * from './room'
export * from './socket'
export * from './user'

export * from './math'
export * from './deck'

const resultSchedule = z.object({
  roomId: z.string().uuid(),
  users: z.array(
    z.object({
      id: z.string().uuid().nonempty(),
      username: z.string().nonempty(),
      value: z.number().nullable().optional(),
    })
  ),
  value: z.number().nullable().optional(),
})

export { resultSchedule }
