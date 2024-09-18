import { SignOut } from '@/components/auth/sign-out'
import { FadeInPageWrapper } from '@/components/fade-in-page-wrapper'
import { GradientText } from '@/components/gradient-text'
import { PageHeader } from '@/components/page-header'
import { ShineBorder } from '@/components/shine-border'
import { TopBar } from '@/components/top-bar/top-bar'
import { UserNav } from '@/components/top-bar/user-nav'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { fetchUserSessions } from '@/data/session-api'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard',
  description: 'Create or join a session to start estimating smartly',
  alternates: {
    canonical: '/dashboard',
  },
}

export default async function DashboardPage() {
  const { data } = await fetchUserSessions()

  return (
    <FadeInPageWrapper duration="slow">
      <TopBar>
        <Button variant="outline" size="sm" asChild>
          <SignOut>Sign Out</SignOut>
        </Button>
        <UserNav />
      </TopBar>

      <div className="container mb-12 flex flex-col items-center justify-between sm:flex-row md:mb-4">
        <PageHeader>
          <GradientText>Dashboard</GradientText>
        </PageHeader>

        <div className="flex items-center gap-3">
          <Button asChild variant="secondary" size="lg" className="w-32">
            <Link href="/s/join">Join</Link>
          </Button>

          <ShineBorder>
            <Button asChild variant="default" size="lg" className="w-32">
              <Link href="/s">Start</Link>
            </Button>
          </ShineBorder>
        </div>
      </div>

      <div className="container space-y-1">
        <h2 className="text-2xl font-bold">Your previous sessions</h2>

        {data.length === 0 ? (
          <p>
            You don&apos;t have any session yet. Create one or join one to get
          </p>
        ) : (
          <div className="space-y-8">
            <p>Click on a session to view details</p>
            <div className="relative">
              <ScrollArea>
                <div className="grid gap-4 pb-4 sm:grid-cols-3 lg:grid-cols-4">
                  {data.map((session) => (
                    <Link
                      key={session.id}
                      className="flex flex-col items-center justify-center rounded-lg border px-3 py-6"
                      href={`/s/${session.id}`}
                    >
                      <div>{new Date(session.createdAt).toDateString()}</div>
                      <div className="text-sm">{session.deck.name} deck</div>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </FadeInPageWrapper>
  )
}
