import { FormDeckProps } from '@/app/room/_components/deck/Deck'
import { CardValue } from '@/app/room/_components/deck/deck.api'

const getCardValue = (cardName: string, cards: CardValue[]) => {
  return cards.find((c) => c.name === cardName)?.value
}

const getAverageCardValue = (
  selectedCards: FormDeckProps,
  deck: CardValue[]
) => {
  if (Object.values(selectedCards).some((r) => !r)) {
    return null
  } else {
    let cardsValues
    let sum = Object.values(selectedCards).reduce((acc, card) => {
      let value = getCardValue(card, deck)
      return value ? acc + value : acc
    }, 0)
    let average = sum / Object.values(selectedCards).length
  }
}

export { getCardValue, getAverageCardValue }
