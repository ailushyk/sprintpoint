import React, { FC } from 'react'

import { Card } from '@/components/Card'
import { Deck } from '@/components/Deck'

import { DeckComponent } from '../types'

export const ProDeck: FC<DeckComponent> = ({
  deck,
  isActive,
  disabled,
  onSelect,
}) => {
  return (
    <div className="mx-auto mb-16 w-64 pl-3">
      <Deck className="justify-center-center flex-wrap">
        {deck.map((card) => (
          <div key={`${card}`} className="m-2">
            <Card
              isActive={isActive(card)}
              onClick={() => {
                !disabled && onSelect(card)
              }}
              disabled={disabled}
            >
              {card.toString()}
            </Card>
          </div>
        ))}
      </Deck>
    </div>
  )
}
