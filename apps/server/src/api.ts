import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'

import { addToAllChecks, getAllChecks } from './redis'

export const api = () => ({
  deck: {
    get: getDeck,
    getAdvanced: getDeckWithoutNonValueCards,
  },
  redis: {
    getAllChecks,
    addToAllChecks,
  },
})
