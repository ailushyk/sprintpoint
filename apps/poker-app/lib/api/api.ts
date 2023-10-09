import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'

import { apiRoom } from '@/lib/api/api-room'
import { addToAllChecks, getAllChecks } from '@/lib/api/redis'
import prisma from '@/lib/prisma'
import { UserProfileValues } from '@/lib/user/user'
import {
  clearUserCookies,
  getUserFromCookies,
  setUserCookies,
} from '@/lib/user/user.api'

export const api = () => ({
  user: {
    get: getUserFromCookies,
    getById: (userId: string) => {
      return prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
    },
    set: async (user: UserProfileValues) => {
      const updateData = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...user,
        },
      })
      setUserCookies(updateData)
    },
    clear: clearUserCookies,
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
