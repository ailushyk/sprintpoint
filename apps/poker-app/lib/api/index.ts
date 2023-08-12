import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'

import { addToAllChecks, getAllChecks } from '@/lib/api/redis'
import { getRoom } from '@/lib/room'
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
    get: getRoom,
  },
  redis: {
    getAllChecks,
    addToAllChecks,
  },
})
