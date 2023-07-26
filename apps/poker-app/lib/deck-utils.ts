import { FormDeckProps } from '@/components_next/deck/Deck'
import { CardValue } from '@/components_next/deck/deck.api'

const getCardValueByName = (cardName: string, cards: CardValue[]) => {
  return cards.find((c) => c.name === cardName)?.value
}

const getAverageCardValue = (
  selectedCards: Array<string>,
  deck: CardValue[]
) => {
  let sum = selectedCards.reduce((acc, cardName) => {
    let value = getCardValueByName(cardName, deck)
    return value ? acc + value : acc
  }, 0)
  return sum / selectedCards.length
}

export { getAverageCardValue }
