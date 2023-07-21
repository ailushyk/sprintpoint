import Link from 'next/link'

import { Deck } from '@/app/room/_components/deck/Deck'
import { UserNav } from '@/app/room/_components/UserNav'

export default async function OfflinePage() {
  return (
    <>
      <header className="supports-backdrop-blur:bg-background/60 bg-background/95 sticky top-0 z-40 w-full border-b backdrop-blur">
        <div className="container flex h-14 items-center justify-between">
          <div>
            <Link href="/" className="font-bold">
              Easy Poker
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
      </header>

      <main className="container flex-1">
        <h1>Offline deck</h1>

        <Deck />
      </main>
    </>
  )
}
