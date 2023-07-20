import { useState } from 'react'

import {
  getJsonFromLocalStorage,
  saveJsonToLocalStorage,
} from '../utils/localStorage'
import { DeckScaleType } from './deck'

export interface PlayerStoreType {
  username: string
  deck?: DeckScaleType
  proMode?: boolean
}

export const usePlayer = () => {
  const [data, setData] = useState<PlayerStoreType>(() => {
    return (
      getJsonFromLocalStorage('player') || {
        username: '',
        deck: 'standard',
        proMode: false,
      }
    )
  })

  const setPlayer = (payload: PlayerStoreType) => {
    setData((prev: PlayerStoreType) => {
      const player = { ...prev, ...payload }
      saveJsonToLocalStorage('player', player)
      return player
    })
  }

  return {
    data,
    setPlayer,
  }
}
