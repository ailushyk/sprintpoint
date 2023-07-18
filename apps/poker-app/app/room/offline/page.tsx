import { RoomLayout } from '@/components/RoomLayout'
import { Deck } from '@/app/room/_components/Deck'

export default async function OfflinePage() {
  return (
    <RoomLayout>
      <h1>Offline</h1>
      <main className="container flex-1">
        <h2>Deck</h2>

        <Deck />
      </main>
    </RoomLayout>
  )
}
