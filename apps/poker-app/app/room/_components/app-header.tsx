import Link from 'next/link'

import { UserNav } from '@/app/room/_components/UserNav'

export function AppHeader() {
  return (
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
  )
}
