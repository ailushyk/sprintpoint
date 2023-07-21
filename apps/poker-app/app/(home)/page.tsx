import Link from 'next/link'

import { buttonVariants, cn } from '@easypoker/ui'

import { CreateRoomDialog } from '@/app/(home)/_components/create-room-dialog'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center">
      <header className="container space-y-1 p-8 text-center">
        <h1 className="text-4xl font-bold">Easy Poker</h1>
        <p className="text-center">
          Easy Poker is a simple way to plan work with your friends online.
        </p>
      </header>

      <div className="container flex-1 space-y-8">
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

        <div className="container flex flex-col items-center justify-center gap-3">
          <Link
            href="/room/create"
            className={cn(buttonVariants({ variant: 'default' }), 'w-32')}
          >
            Create Room
          </Link>
          <Link
            href="/room/join"
            className={cn(buttonVariants({ variant: 'outline' }), 'w-32')}
          >
            Join Room
          </Link>
          <Link
            href="/room/offline"
            className={cn(buttonVariants({ variant: 'outline' }), 'w-32')}
          >
            Offline
          </Link>
        </div>

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
