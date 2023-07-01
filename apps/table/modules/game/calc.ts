import { PlayerType } from './types'
import { deck as deckMap } from './deck'

export const calc = (players: PlayerType[]) => {
  let counter = 0
  if (players.length > 0) {
    const average =
      players.reduce((acc, i) => {
        if (typeof i.sp === 'number') {
          counter = counter + 1
          return acc + i.sp
        }
        return acc
      }, 0) / counter

    return deckMap.reduce((prev, current) => {
      return Math.abs(current - average) < Math.abs(prev - average)
        ? current
        : prev
    }, 0)
  } else {
    return null
  }
}
