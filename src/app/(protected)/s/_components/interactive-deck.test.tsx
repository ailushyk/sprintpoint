import '@testing-library/jest-dom'
import 'jest-axe/extend-expect'
import { render } from '@testing-library/react'
import user from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Card } from '@/data/card-api'
import { InteractiveDeck } from './interactive-deck'

describe('InteractiveDeck', () => {
  const deck: Card[] = [
    {
      id: '1',
      title: '1',
      value: 1,
      order: 1,
    },
    {
      id: '2',
      title: '2',
      value: 2,
      order: 2,
    },
    {
      id: '3',
      title: '3',
      value: 3,
      order: 3,
    },
  ]

  it('should have a data-card-id attribute on the card', async () => {
    const { getAllByTestId } = render(<InteractiveDeck cards={deck} />)
    const cards = getAllByTestId('card')
    expect(cards).toHaveLength(deck.length)

    cards.forEach((card, index) => {
      expect(card).toHaveAttribute('data-card-id', deck[index].id)
      expect(card).toHaveTextContent(deck[index].title)
    })
  })

  it('should focus on the first tab after the component is rendered', async () => {
    const { getByText } = render(<InteractiveDeck cards={deck} />)
    const card1 = getByText(deck[0].title)
    expect(card1).toHaveAttribute('tabindex', '0')
  })

  it('should toggle data-state attribute between "off" and "on" when the tab is clicked', async () => {
    const { getByText } = render(<InteractiveDeck cards={deck} />)
    const card1 = getByText(deck[0].title)
    expect(card1).toHaveAttribute('data-state', 'off')
    await user.click(card1)
    expect(card1).toHaveAttribute('data-state', 'on')
    await user.click(card1)
    expect(card1).toHaveAttribute('data-state', 'off')
  })

  it('should allow only one tab to be "on" at a time', async () => {
    const { getByText } = render(<InteractiveDeck cards={deck} />)
    const card1 = getByText(deck[0].title)
    const card2 = getByText(deck[1].title)
    const card3 = getByText(deck[2].title)

    await user.click(card1)
    expect(card1).toHaveAttribute('data-state', 'on')
    expect(card2).toHaveAttribute('data-state', 'off')
    expect(card3).toHaveAttribute('data-state', 'off')

    await user.click(card2)
    expect(card1).toHaveAttribute('data-state', 'off')
    expect(card2).toHaveAttribute('data-state', 'on')
    expect(card3).toHaveAttribute('data-state', 'off')

    await user.click(card3)
    expect(card1).toHaveAttribute('data-state', 'off')
    expect(card2).toHaveAttribute('data-state', 'off')
    expect(card3).toHaveAttribute('data-state', 'on')
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<InteractiveDeck cards={deck} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
