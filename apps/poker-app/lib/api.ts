import {
  getDeck,
  getDeckWithoutNonValueCards,
} from '@/components_next/deck/deck.api'

import { getRoom } from '@/lib/room'
import { getUserInfo, setUserInfo } from '@/lib/user/user.api'

export const api = () => ({
  user: {
    get: getUserInfo,
    set: setUserInfo,
    login: '/api/user/login',
    logout: '/api/user/logout',
    register: '/api/user/register',
    update: '/api/user/update',
    updatePassword: '/api/user/updatePassword',
    updateAvatar: '/api/user/updateAvatar',
    updateEmail: '/api/user/updateEmail',
    updatePhone: '/api/user/updatePhone',
    updateNickname: '/api/user/updateNickname',
    updateSignature: '/api/user/updateSignature',
  },
  deck: {
    get: getDeck,
    getAdvanced: getDeckWithoutNonValueCards,
  },
  room: {
    get: getRoom,
  },
})
