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
  type: 'no-value'
  value: null
}

type Card = SimpleCard | ColorCard | NoValueCard

type DeckValue = {
  id: string
  name: string
  description?: string
  cards: Card[]
}

const standardDeck: DeckValue = {
  id: 'standard',
  name: 'Standard',
  cards: [
    {
      name: '0',
      type: 'simple',
      value: 0,
    },
    {
      name: '1/2',
      type: 'simple',
      value: 0.5,
    },
    {
      name: '1',
      type: 'simple',
      value: 1,
    },
    {
      name: '2',
      type: 'simple',
      value: 2,
    },
    {
      name: '3',
      type: 'simple',
      value: 3,
    },
    {
      name: '5',
      type: 'simple',
      value: 5,
    },
    {
      name: '8',
      type: 'simple',
      value: 8,
    },
    {
      name: '13',
      type: 'simple',
      value: 13,
    },
    {
      name: '20',
      type: 'simple',
      value: 20,
    },
    {
      name: '40',
      type: 'simple',
      value: 40,
    },
    {
      name: '100',
      type: 'simple',
      value: 100,
    },
    {
      name: '?',
      type: 'no-value',
      value: null,
    },
    {
      name: '☕',
      type: 'no-value',
      value: null,
    },
  ],
}

function getDeck(name: string): { data: DeckValue } {
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
