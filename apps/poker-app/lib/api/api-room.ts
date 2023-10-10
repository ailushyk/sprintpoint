import { Room } from '@prisma/client'

import prisma from '@/lib/prisma'

export const apiRoom = {
  create: (data: Partial<Room>, userId: string, deckId: string) => {
    return prisma.room.create({
      data: {
        ...data,
        users: {
          connect: [
            {
              id: userId,
            },
          ],
        },
        sessions: {
          create: [
            {
              deck: {
                connect: {
                  id: deckId,
                },
              },
            },
          ],
        },
      },
    })
  },
  get: (code: string) => {
    return prisma.room.findUnique({
      where: {
        code,
      },
    })
  },
  join: ({ roomId, userId }: { roomId: string; userId: string }) => {
    return prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        users: {
          connect: [
            {
              id: userId,
            },
          ],
        },
      },
    })
  },
  session: {
    getByRoom: (roomCode: string) => {
      return prisma.session.findFirst({
        where: {
          room: {
            code: roomCode,
          },
        },
        include: {
          room: true,
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
  },
}
