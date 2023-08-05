import Link from 'next/link'
import { PlayGameButton } from '@/components_next/play-game-button'

import { Button, buttonVariants, cn } from '@easypoker/ui'

export default function AppPage() {
  return (
    <main className="h-full w-full space-y-8">
      <header className="container space-y-1 p-8 text-center">
        <h1 className="text-4xl font-bold">
          Start estimating smarter with Easy Poker!
        </h1>
      </header>

      <div className="flex flex-col items-center justify-center gap-3 pb-8">
        <PlayGameButton>New Room</PlayGameButton>

        <Link
          href="/room/join"
          className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
        >
          Join Room
        </Link>

        <hr />
      </div>

      <div className="container space-y-1">
        <h2 className="text-2xl font-bold">Your rooms</h2>
        <p>
          You don&apos;t have any rooms yet. Create one or join one to get.
          Coming Soon.
        </p>

        <div className="hidden">
          <p>Here are the rooms you&apos;ve created or joined.</p>

          {/* TODO: Replace with actual rooms*/}
          <ul>
            <li>Room 1</li>
            <li>Room 2</li>
            <li>Room 3</li>
          </ul>
        </div>
      </div>
    </main>
  )
}
