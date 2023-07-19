'use client'

import React from 'react'
import { api } from '@/api/api'
import { Label, RadioGroup, RadioGroupItem } from '@easypoker/ui'

const estimateParams = ['risk', 'complexity', 'unfamiliar']

export const Deck = () => {
  const [vote, setVote] = React.useState<number | null>(null)
  const { data } = api().deck.get('standard')

  return (
    <div className="flex flex-col items-center">
      <div>
        <div>Vote</div>
        <div>?</div>
      </div>
      <div className="grid grid-cols-3 place-items-center md:grid-cols-1 md:gap-6">
        {estimateParams.map((param) => (
          <section
            key={param}
            className="flex flex-col items-center gap-1 md:items-start"
          >
            <h2 className="font-semibold capitalize">{param}</h2>

            <RadioGroup className="flex flex-col  gap-3 md:flex-row">
              {data.cards.map((card) => (
                <Label
                  key={`${param}-${card.title}`}
                  htmlFor={`${param}-${card.title}`}
                  className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 text-xl"
                >
                  <RadioGroupItem
                    id={`${param}-${card.title}`}
                    value={card.title}
                    className="sr-only"
                    // onSelect={() => setVote(card.value)}
                  />
                  {card.title}
                </Label>
              ))}
            </RadioGroup>
          </section>
        ))}
      </div>
    </div>
  )
}
