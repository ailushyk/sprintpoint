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
    create: (data: Partial<Room>) => {
      // const room = await
      console.log('createRoom')
    },
    get: getRoom,
  },
  redis: {
    getAllChecks,
    addToAllChecks,
  },
})
