import React, { useMemo } from 'react'
import { Control, useWatch } from 'react-hook-form'

import { getAverageCardValue } from '@/lib/deck-utils'
import { getClosest } from '@/lib/math'
import { FormDeckProps } from '@/app/room/_components/deck/Deck'
import { type DeckValue } from '@/app/room/_components/deck/deck.api'

export const PickedCard = ({
  control,
  deck,
}: {
  control: Control<FormDeckProps>
  deck: DeckValue
}) => {
  const values = useWatch({ control })

  const deckValues = useMemo(() => {
    return deck.cards.map((card) => card.value)
  }, [deck.cards])

  const sp = getClosest(getAverageCardValue(values, deck.cards), deckValues)

  return <p>Watch: {sp}</p> // only re-render at the custom hook level, when risk changes
}
