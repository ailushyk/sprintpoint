import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'

import { apiRoom } from '@/lib/api/api-room'
import { addToAllChecks, getAllChecks } from '@/lib/api/redis'
import prisma from '@/lib/prisma'
import { clearUserCookies, getUserInfo, setUserInfo } from '@/lib/user/user.api'

export const api = () => ({
  user: {
    get: getUserInfo,
    getById: (userId: string) => {
      return prisma.user.findUnique({
        where: {
          id: userId,
        },
      })
    },
    set: setUserInfo,
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
