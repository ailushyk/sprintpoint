import { Card } from '@/data/card-api'
import React, { useCallback, useEffect } from 'react'

/**
 *  When the user presses the arrow button, focus on the previous or next card.
 *  If no card is selected, focus on the first card instead
 */
export const useInteractiveDeck = ({ cards }: { cards: Card[] }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (getFocusedCardId()) return
      if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey)
        return
      const keys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown']
      if (keys.includes(event.key)) {
        event.preventDefault()
        const currentSelected =
          containerRef?.current?.querySelector('[data-state=on]')
        if (currentSelected) {
          const nextCard =
            event.key === 'ArrowLeft' || event.key === 'ArrowUp'
              ? currentSelected.previousElementSibling
              : currentSelected.nextElementSibling
          nextCard instanceof HTMLElement && nextCard.focus()
        } else {
          const firstCard = containerRef?.current?.firstElementChild
          firstCard instanceof HTMLElement && firstCard.focus()
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  useEffect(() => {
    // attach the event listener
    document.addEventListener('keydown', handleKeyPress)
    // remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  const [selectedCard, setSelectedCard] = React.useState<Card | undefined>()
  const onSelectCard = useCallback(
    (cardId: string) => setSelectedCard(cards.find((c) => c.id === cardId)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  return {
    containerRef,
    selectedCard,
    onSelectCard,
  }
}

function getFocusedCardId() {
  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement) {
    return activeElement?.dataset.cardId
  }
}
