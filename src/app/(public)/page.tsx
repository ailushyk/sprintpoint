import { DashboardLink } from '@/app/(public)/_components/dashboard-link'
import { FadeInPageWrapper } from '@/components/fade-in-page-wrapper'
import { GradientText } from '@/components/gradient-text'
import { TopBar } from '@/components/top-bar/top-bar'
import { UserNav } from '@/components/top-bar/user-nav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata = {
  title: 'Turn smart estimation into smooth, predictable fun at work',
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <FadeInPageWrapper duration="slow">
      <TopBar>
        <Button variant="outline" size="sm" asChild>
          <Link href="/contact">Contact</Link>
        </Button>
        <DashboardLink />
        <UserNav />
      </TopBar>

      <main>
        <header className="container space-y-1 py-8 text-center">
          <h1 className="mx-auto max-w-xl text-4xl font-bold">
            <GradientText>
              Turn smart estimation into smooth, predictable fun at work
            </GradientText>
          </h1>
        </header>

        <div className="container flex-1 space-y-8">
          <div className="flex items-center justify-center gap-4 py-8">
            <Button asChild size="lg" variant="secondary" className="w-32">
              <Link href="/s/join">Join</Link>
            </Button>
            <Button asChild size="lg" className="w-32">
              <Link href="/s">Start</Link>
            </Button>
          </div>

          <section>
            <h2 className="text-2xl font-bold">Description</h2>
            <p>
              The Sprint Point app is a user-friendly and efficient tool for
              estimating project scope. It saves time by eliminating lengthy
              discussions and debates among team members. The app enables team
              members to cast their votes simultaneously and anonymously, and
              then reveal their votes together. This anonymity allows everyone
              to express their opinions freely without fear of judgment.
              Additionally, the app allows teams to track project progress and
              make adjustments to their plan as needed, helping them stay on
              track with their goals and deadlines. Overall, the Sprint Point
              app is an essential tool for agile teams looking to streamline
              their work process and ensure successful project completion.
            </p>
          </section>

          <div className="flex items-center justify-center gap-3">
            <div className="px-6 py-4">Over 1000 events!</div>
          </div>

          <section className="space-y-1">
            <h2 className="text-2xl font-bold">How it works</h2>
            <p className="">
              To play the game, you have two options: create a new room or join
              an existing one. To create a new room, click on the “Start” button
              and invite your friends to join. If you want to join an existing
              room, click on the “Join” button and connect to it. Once
              you&apos;re in a room, start a round and share the link with your
              friends. Everyone can vote on the cards they want to play. Once
              everyone has voted, the round is over and you can start a new one.
            </p>
          </section>
        </div>
      </main>

      <footer>
        <div className="container py-8 text-center">
          <p>
            Made with ❤️ by{' '}
            <Link
              href="https://github.com/ailushyk"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alex I.
            </Link>
          </p>
        </div>

        <div className="container flex items-center justify-between py-8 text-center text-xs text-muted-foreground">
          <p>© 2021 Sprint Point. All rights reserved.</p>
          <Link
            href="https://stats.uptimerobot.com/Mih4VWfgtR"
            target="_blank"
            rel="noopener noreferrer"
          >
            System status
          </Link>
        </div>
      </footer>
    </FadeInPageWrapper>
  )
}
