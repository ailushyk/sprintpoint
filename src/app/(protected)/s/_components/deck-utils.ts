type SimpleCard = {
  name: string
  type: 'simple'
  value: number
}

type ColorCard = {
  name: string
  type: 'color'
  hex: string // used for display color
  value: number
}

type NoValueCard = {
  name: string
  type: 'non-value'
  value: null
}

export type CardValue = SimpleCard | ColorCard | NoValueCard

const getCardValueByName = (
  cardName: string | undefined,
  cards: CardValue[],
) => {
  if (!cardName) return null
  return cards.find((c) => c.name === cardName)?.value
}

const getAverageCardValue = (
  selectedCards: Array<string>,
  deck: CardValue[],
) => {
  const sum = selectedCards.reduce((acc, cardName) => {
    const value = getCardValueByName(cardName, deck)
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

export { getAverageCardValue, getCardValueByName, getStatusByValues }
