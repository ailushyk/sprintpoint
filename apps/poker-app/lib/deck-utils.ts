import { FormDeckProps } from '@/app/room/_components/deck/Deck'
import { CardValue } from '@/app/room/_components/deck/deck.api'

const getCardValueByName = (cardName: string, cards: CardValue[]) => {
  return cards.find((c) => c.name === cardName)?.value
}

const getAverageCardValue = (
  selectedCards: FormDeckProps,
  deck: CardValue[]
) => {
  let cardNames = Object.values(selectedCards)

  if (cardNames.some((r) => !r)) {
    return null
  } else {
    let sum = cardNames.reduce((acc, cardName) => {
      let value = getCardValueByName(cardName, deck)
      return value ? acc + value : acc
    }, 0)
    return sum / cardNames.length
  }
}

export { getAverageCardValue }
