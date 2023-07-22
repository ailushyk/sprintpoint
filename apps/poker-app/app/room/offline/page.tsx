import { AppHeader } from '@/components_next/app-header/app-header'
import { Deck } from '@/components_next/deck/Deck'

import { api } from '@/lib/api'

export default async function OfflinePage() {
  const deck = api().deck.getAdvanced('standard')

  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <h1>Offline deck</h1>

        <Deck deck={deck.data} />
      </main>
    </>
  )
}
