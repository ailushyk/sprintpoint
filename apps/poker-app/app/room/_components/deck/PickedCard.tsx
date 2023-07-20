import React, { useMemo } from 'react'
import { Control, useWatch } from 'react-hook-form'

import { getAverageCardValue } from '@/lib/deck-utils'
import { getClosest } from '@/lib/math'
import { DotsSkeleton } from '@/components/DotsSkeleton'
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

  return (
    <div className="border-muted bg-popover flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 text-4xl">
      {sp ?? <DotsSkeleton />}
    </div>
  )
}
