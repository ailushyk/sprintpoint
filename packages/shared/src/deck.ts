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

type CardValue = SimpleCard | ColorCard | NoValueCard

type DeckValue = {
  id: string
  name: string
  description?: string
  cards: CardValue[]
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
      name: '0.5',
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
      type: 'non-value',
      value: null,
    },
    {
      name: '☕',
      type: 'non-value',
      value: null,
    },
  ],
}

function getDeck(name: string): DeckValue {
  switch (name) {
    case 'standard':
      return standardDeck
    default:
      throw new Error(`Deck ${name} not found`)
  }
}

async function getDeckWithoutNonValueCards(
  name: string
): Promise<{ data: DeckValue }> {
  const deck = getDeck(name)
  const cards = deck.cards.filter((card) => card.type !== 'non-value')
  return Promise.resolve({ data: { ...deck, cards } })
}

export { getDeck, getDeckWithoutNonValueCards }

export type { CardValue, DeckValue }
