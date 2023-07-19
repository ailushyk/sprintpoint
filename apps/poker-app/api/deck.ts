type ColorCardType = 'green' | 'cyan' | 'blue' | 'yellow' | 'purple' | 'red'
type CardType = string | ColorCardType | 'no-value'

type SimpleCard = {
  title: string
  type: 'simple'
  value: number
}

type ColorCard = {
  title: ColorCardType
  type: 'color'
  hex: string
  value: number
}

type NoValueCard = {
  title: string
  type: 'no-value'
  value: null
}

type Card = SimpleCard | ColorCard | NoValueCard

type Deck = {
  id: string
  name: string
  description?: string
  cards: Card[]
}

const standardDeck: Deck = {
  id: 'standard',
  name: 'Standard',
  cards: [
    {
      title: '0',
      type: 'simple',
      value: 0,
    },
    {
      title: '1/2',
      type: 'simple',
      value: 0.5,
    },
    {
      title: '1',
      type: 'simple',
      value: 1,
    },
    {
      title: '2',
      type: 'simple',
      value: 2,
    },
    {
      title: '3',
      type: 'simple',
      value: 3,
    },
    {
      title: '5',
      type: 'simple',
      value: 5,
    },
    {
      title: '8',
      type: 'simple',
      value: 8,
    },
    {
      title: '13',
      type: 'simple',
      value: 13,
    },
    {
      title: '20',
      type: 'simple',
      value: 20,
    },
    {
      title: '40',
      type: 'simple',
      value: 40,
    },
    {
      title: '100',
      type: 'simple',
      value: 100,
    },
    {
      title: '?',
      type: 'no-value',
      value: null,
    },
    {
      title: '☕',
      type: 'no-value',
      value: null,
    },
  ],
}

function getDeck(name: string): { data: Deck } {
  let deck

  switch (name) {
    case 'standard':
      deck = standardDeck
      break
    default:
      deck = standardDeck
  }

  return { data: deck }
}

export { getDeck }
