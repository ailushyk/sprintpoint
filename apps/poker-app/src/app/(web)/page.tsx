import { ShineBorder } from '@easypoker/ui'

import { api } from '@/lib/api/api'
import { GradientText } from '@/components/gradient-text'
import { StartSession } from '@/components/start-session'

export const revalidate = 30

export const metadata = {
  title: 'Sprint Point - Empowering Agile Teams with Planning Poker',
  alternates: {
    canonical: '/',
  },
}

export default async function Home() {
  const estimatesCounter = await api().redis.getAllChecks()

  return (
    <main className="flex flex-col items-center">
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
          <StartSession>Start Play</StartSession>
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

        <div className="flex items-center justify-center gap-3">
          <ShineBorder>
            Total estimates performed: {estimatesCounter}
          </ShineBorder>
        </div>

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
