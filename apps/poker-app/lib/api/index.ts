import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'
import { Room } from '@easypoker/shared/src/refactor-types'

import {
  addToAllChecks,
  createRoom,
  getAllChecks,
  getRoom,
} from '@/lib/api/redis'
import prisma from '@/lib/prisma'
import { getUserInfo, setUserInfo } from '@/lib/user/user.api'

export const api = () => ({
  user: {
    get: getUserInfo,
    set: setUserInfo,
  },
  deck: {
    get: getDeck,
    getAdvanced: getDeckWithoutNonValueCards,
  },
  room: {
    // create: createRoom,
    create: (data: Partial<Room>, userId: string) => {
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
  },
  redis: {
    getAllChecks,
    addToAllChecks,
  },
})
