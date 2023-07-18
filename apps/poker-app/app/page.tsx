import Link from 'next/link'
import { buttonVariants, cn } from '@easypoker/ui'

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center">
      <header className="p-8 container text-center space-y-1">
        <h1 className="text-4xl font-bold">Easy Poker</h1>
        <p className="text-center">
          Easy Poker is a simple way to plan work with your friends online.
        </p>
      </header>

      <div className="container space-y-8 flex-1">
        <section className="space-y-1">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="">
            You can create a room and invite your friends to join. Or, you can
            join a room that someone else has created. Then, start a round and
            share the link to the room with your friends. Everyone can vote on
            the cards they want to play. Once everyone has voted, the round is
            over and you can start a new one.
          </p>
        </section>

        <nav className="container gap-3 flex flex-col items-center justify-center">
          <Link
            href="/room/create"
            className={cn(buttonVariants({ variant: 'default' }))}
          >
            Create Room
          </Link>
          <Link
            href="/room/join"
            className={cn(buttonVariants({ variant: 'link' }))}
          >
            Join Room
          </Link>
        </nav>

        <section className="space-y-1">
          <h2 className="text-2xl font-bold">Your rooms</h2>

          <p>Here are the rooms you&apos;ve created or joined.</p>

          {/* TODO: Replace with actual rooms*/}
          <ul>
            <li>Room 1</li>
            <li>Room 2</li>
            <li>Room 3</li>
          </ul>

          <p>
            You don&apos;t have any rooms yet. Create one or join one to get
          </p>
        </section>
      </div>
    </div>
  )
}
