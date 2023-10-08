import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'

import {
  addToAllChecks,
  createRoom,
  getAllChecks,
  getRoom,
} from '@/lib/api/redis'
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
    create: createRoom,
    get: getRoom,
  },
  redis: {
    getAllChecks,
    addToAllChecks,
  },
})
