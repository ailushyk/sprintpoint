import { AppHeader } from '@/app/room/_components/app-header'
import { Deck } from '@/app/room/_components/deck/Deck'

export default async function OfflinePage() {
  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <h1>Offline deck</h1>

        <Deck />
      </main>
    </>
  )
}
