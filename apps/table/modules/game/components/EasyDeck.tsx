import React, { FC } from 'react'
import { types } from '../constants'
import { DeckRowTitle } from '../../../components/DeckRowTitle'
import { Deck } from '../../../components/Deck'
import { Card } from '../../../components/Card'
import { DeckComponent } from '../types'

export const EasyDeck: FC<DeckComponent> = ({
  deck,
  isActive,
  disabled,
  onSelect,
}) => {
  return (
    <div className="mb-16">
      {types.map((type) => (
        <div key={type} className="mb-4">
          <DeckRowTitle>{type}</DeckRowTitle>
          <Deck className="space-x-2 md:space-x-4">
            {deck.map((card) => (
              <Card
                key={`${type}-${card}`}
                isActive={isActive(card, type)}
                onClick={() => {
                  !disabled && onSelect(card, type)
                }}
                disabled={disabled}
              >
                {card.toString()}
              </Card>
            ))}
          </Deck>
        </div>
      ))}
    </div>
  )
}
