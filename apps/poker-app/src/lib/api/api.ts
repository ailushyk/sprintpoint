import { User } from '@prisma/client'

import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'

import { apiRoom } from '@/lib/api/api-room'
import { UserProfileValues } from '@/lib/api/api-types'
import { addToAllChecks, getAllChecks } from '@/lib/api/redis'
import { session } from '@/lib/api/session'
import prisma from '@/lib/prisma'

export const api = () => ({
  user: {
    /** @deprecated use session.user.get() */
    me: session.user.get,
    set: async (user: UserProfileValues) => {
      const updateData = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...user,
        },
      })
      session.user.set(updateData)
    },
    get: (userId: string) => {
      return prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
    },
    create: ({
      data,
    }: {
      data: Pick<User, 'username' | 'avatar' | 'theme' | 'type'>
    }) => prisma.user.create({ data }),
    rooms: async () => {
      const user = await session.user.get()
      return prisma.room.findMany({
        where: {
          users: {
            some: {
              id: user.id,
            },
          },
        },
      })
    },
  },
  deck: {
    all: () => {
      return prisma.deck.findMany()
    },
    get: getDeck,
    getAdvanced: getDeckWithoutNonValueCards,
  },
  room: apiRoom,
  redis: {
    getAllChecks,
    addToAllChecks,
  },
})
