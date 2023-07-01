import React, { FC } from 'react'
import { Deck } from '../../../components/Deck'
import { Card } from '../../../components/Card'
import { DeckComponent } from '../types'

export const ProDeck: FC<DeckComponent> = ({
  deck,
  isActive,
  disabled,
  onSelect,
}) => {
  return (
    <div className="w-64 mb-16 mx-auto pl-3">
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
