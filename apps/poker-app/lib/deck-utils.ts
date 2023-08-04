import { CardValue } from '@easypoker/shared'

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

function getStatusByValues(selectedCards: string[]) {
  if (selectedCards.every((card) => !!card)) {
    return 'voted'
  }
  if (selectedCards.every((card) => !card)) {
    return 'idle'
  }
  return 'voting'
}

export { getAverageCardValue, getStatusByValues }
