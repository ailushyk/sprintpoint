import { getDeck, getDeckWithoutNonValueCards } from '@easypoker/shared'

export const api = () => ({
  deck: {
    get: getDeck,
    getAdvanced: getDeckWithoutNonValueCards,
  },
})
