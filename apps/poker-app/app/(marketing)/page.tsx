import Link from 'next/link'
import { PlayGameButton } from '@/components_next/play-game-button'

import { buttonVariants, cn } from '@easypoker/ui'

export const metadata = {
  title: 'EasyPoker - Empowering Agile Teams with Planning Poker',
}

export default function Home() {
  return (
    <main className="flex h-screen flex-col items-center">
      <header className="container space-y-1 p-8 text-center">
        <h1 className="text-4xl font-bold">Easy Poker</h1>
        <p className="text-center">
          Easy Poker is a simple way to plan work with your team.
        </p>
      </header>

      <div className="container flex-1 space-y-8">
        <div className="flex items-center justify-center gap-4 py-8">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
          >
            Dashboard
          </Link>
          <PlayGameButton>Start Play</PlayGameButton>
        </div>

        <section>
          <h2 className="text-2xl font-bold">Description</h2>
          <p>
            The Planning Poker app is a user-friendly and efficient tool for
            estimating project scope. It saves time by eliminating lengthy
            discussions and debates among team members. The app enables team
            members to cast their votes simultaneously and anonymously, and then
            reveal their votes together. This anonymity allows everyone to
            express their opinions freely without fear of judgment.
            Additionally, the app allows teams to track project progress and
            make adjustments to their plan as needed, helping them stay on track
            with their goals and deadlines. Overall, the Planning Poker app is
            an essential tool for agile teams looking to streamline their work
            process and ensure successful project completion.
          </p>
        </section>

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
      </div>
    </main>
  )
}
