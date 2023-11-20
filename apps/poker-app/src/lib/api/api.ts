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
      return session.user.get()
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
    }) => {
      return prisma.user.create({ data })
    },
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
        orderBy: {
          updatedAt: 'desc',
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
  session: {
    create: async (deckId: string) => {
      return prisma.session.create({
        data: {
          deck: {
            connect: {
              id: deckId,
            },
          },
          rounds: {
            create: [
              {
                order: 1,
                status: 'idle',
              },
            ],
          },
        },
      })
    },
    get(sessionId: string) {
      return prisma.session.findUnique({
        where: {
          id: sessionId,
        },
        include: {
          rounds: {
            orderBy: {
              order: 'desc',
            },
          },
          deck: {
            include: {
              cards: {
                orderBy: {
                  order: 'asc',
                },
              },
            },
          },
        },
      })
    },
    nextRound: async (
      sessionId: string,
      data: {
        order: number
      }
    ) => {
      // finish current round
      await prisma.round.updateMany({
        where: {
          sessionId: {
            contains: sessionId,
          },
          status: {
            not: 'finished',
          },
        },
        data: {
          status: 'finished',
        },
      })
      // create new round
      return prisma.round.create({
        data: {
          ...data,
          session: {
            connect: {
              id: sessionId,
            },
          },
        },
      })
    },
  },
  room: apiRoom,
  redis: {
    getAllChecks,
    addToAllChecks,
  },
})