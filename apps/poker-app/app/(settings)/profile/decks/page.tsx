import React from 'react'
import { decksMap } from '@/modules/game/deck'

export default function DecksPage() {
  return (
    <div className="m-auto max-w-xl">
      <h2 className="mb-8 font-semibold uppercase">All decks</h2>
      <div>
        {Array.from(decksMap).map(([_, deck]) => (
          <div key={_} className="mb-8 flex flex-col space-y-1">
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
