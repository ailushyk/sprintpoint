'use client'

import { useDeck } from '@/modules/game/useDeck'
import { Label, RadioGroup, RadioGroupItem, Toggle } from '@easypoker/ui'

const estimateParams = ['risk', 'complexity', 'unfamiliar']
export const Deck = () => {
  const { deck } = useDeck('standard')

  return (
    <div className="grid grid-cols-3 place-items-center md:grid-cols-1 md:gap-6">
      {estimateParams.map((param) => (
        <section
          key={param}
          className="flex flex-col items-center gap-1 md:items-start"
        >
          <h2 className="font-semibold capitalize">{param}</h2>

          <RadioGroup className="flex flex-col  gap-3 md:flex-row">
            {deck.map((card) => (
              <Label
                key={`${param}-${card}`}
                htmlFor={`${param}-${card}`}
                className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 text-xl"
              >
                <RadioGroupItem
                  id={`${param}-${card}`}
                  value={card.toString()}
                  className="sr-only"
                />
                {card}
              </Label>
            ))}
          </RadioGroup>
        </section>
      ))}
    </div>
  )
}
