import Link from 'next/link'
import { GradientText } from '@/components_next/gradient-text'
import { PlayGameButton } from '@/components_next/play-game-button'

import { buttonVariants, cn } from '@easypoker/ui'

import { api } from '@/lib/api'

export const revalidate = 30

export const metadata = {
  title: 'Sprint Point - Empowering Agile Teams with Planning Poker',
}

export default async function Home() {
  const checks = await api().redis.getAllChecks()

  return (
    <main className="flex h-screen flex-col items-center">
      <header className="container space-y-1 p-8 text-center">
        <h1 className="text-4xl font-bold">
          <GradientText>Sprint Point</GradientText>
        </h1>
        <p className="text-center">
          Start estimating smarter with Planing Poker
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
            The Sprint Point app is a user-friendly and efficient tool for
            estimating project scope. It saves time by eliminating lengthy
            discussions and debates among team members. The app enables team
            members to cast their votes simultaneously and anonymously, and then
            reveal their votes together. This anonymity allows everyone to
            express their opinions freely without fear of judgment.
            Additionally, the app allows teams to track project progress and
            make adjustments to their plan as needed, helping them stay on track
            with their goals and deadlines. Overall, the Sprint Point app is an
            essential tool for agile teams looking to streamline their work
            process and ensure successful project completion.
          </p>
        </section>

        <aside className="flex items-center justify-center">
          <div className="rounded-lg border border-destructive bg-gradient-to-br from-red-700 to-amber-600 p-[1px]">
            <div className="rounded-lg bg-background/90 px-6 py-4">
              Total estimates performed: {checks}
            </div>
          </div>
        </aside>

        <section className="space-y-1">
          <h2 className="text-2xl font-bold">How it works</h2>
          <p className="">
            To play the game, you have two options: create a new room or join an
            existing one. To create a new room, click on the “Play” button and
            invite your friends to join. If you want to join an existing room,
            click on the “Join” button and connect to it. Once you&apos;re in a
            room, start a round and share the link with your friends. Everyone
            can vote on the cards they want to play. Once everyone has voted,
            the round is over and you can start a new one.
          </p>
        </section>
      </div>
    </main>
  )
}
