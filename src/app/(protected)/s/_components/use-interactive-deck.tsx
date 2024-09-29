import { Card } from '@/data/card-api'
import { debounce } from '@/lib/debounce'
import { scrollElementIntoView } from '@/lib/scroll-element-into-view'
import React, { useCallback, useEffect } from 'react'

const getFocusedCardId = () => {
  const activeElement = document.activeElement
  if (activeElement instanceof HTMLElement) {
    return activeElement?.dataset.cardId
  }
}

const scrollIntoCenterListener = (event: Event) => {
  console.log('in')
  const target = event.target as HTMLElement
  const cardId = target?.dataset.cardId
  if (cardId) {
    scrollElementIntoView({ element: target })
  }
}

/**
 *  When the user presses the arrow button, focus on the previous or next card.
 *  If no card is selected, focus on the first card instead.
 *  Each card should have a `data-card-id` attribute.
 */
export const useInteractiveDeck = ({ cards }: { cards: Card[] }) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [selectedCard, setSelectedCard] = React.useState<Card | undefined>()
  const onSelectCard = useCallback(
    (cardId: string) => setSelectedCard(cards.find((c) => c.id === cardId)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (getFocusedCardId()) return
    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) return
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
  }, [])

  useEffect(() => {
    containerRef?.current?.addEventListener(
      'focusin',
      debounce(scrollIntoCenterListener, 200),
    )
    return () => {
      containerRef?.current?.removeEventListener(
        'focusin',
        scrollIntoCenterListener,
        true,
      )
    }
  }, [onSelectCard])

  useEffect(() => {
    // focus on the first card when the component mounts
    const firstCard = containerRef?.current?.firstElementChild
    firstCard instanceof HTMLElement && firstCard.focus()
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])

  return {
    containerRef,
    selectedCard,
    onSelectCard,
  }
}
