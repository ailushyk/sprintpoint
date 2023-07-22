import { api } from '@/lib/api'
import { AppHeader } from '@/app/room/_components/app-header'
import { Deck } from '@/app/room/_components/deck/Deck'

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
