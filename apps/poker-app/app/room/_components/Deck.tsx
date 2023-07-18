'use client'

import { useDeck } from '@/modules/game/useDeck'
import { Button } from '@easypoker/ui'

const estimateParams = ['risk', 'complexity', 'unfamiliar']
export const Deck = () => {
  const { deck } = useDeck('standard')

  return (
    <div className="grid grid-cols-3 md:grid-cols-1 md:gap-6 place-items-center">
      {estimateParams.map((param) => (
        <section
          key={param}
          className="flex items-center md:items-start flex-col gap-1"
        >
          <h2 className="font-semibold capitalize">{param}</h2>
          <div className="flex-col md:flex-row  flex gap-3">
            {deck.map((card) => (
              <Button key={card} className="inline-block w-14 h-14 text-xl p-0">
                {card}
              </Button>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
