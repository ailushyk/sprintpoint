import React from 'react'
import { decksMap } from '@/modules/game/deck'

export default function DecksPage() {
  return (
    <div className="max-w-xl m-auto">
      <h2 className="uppercase font-semibold mb-8">All decks</h2>
      <div>
        {Array.from(decksMap).map(([_, deck]) => (
          <div key={_} className="flex flex-col space-y-1 mb-8">
            <div>
              <b>{deck.name}</b>
            </div>
            <div className="text-sky-800">[{deck.deck.join(', ')}]</div>
            <div>{deck.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
