import { PageHeader } from '@/components/page-header'
import { TopBar } from '@/components/top-bar/top-bar'
import { UserNav } from '@/components/top-bar/user-nav'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { fetchUserSessions } from '@/data/session-api'
import Link from 'next/link'

export default async function DashboardPage() {
  const { data } = await fetchUserSessions()

  return (
    <div>
      <TopBar>
        <UserNav />
      </TopBar>

      <div className="container">
        <PageHeader>Dashboard</PageHeader>
      </div>

      <div className="flex flex-col items-center justify-center gap-3 pb-8 md:flex-row-reverse">
        <Button asChild variant="default" size="lg" className="w-32">
          <Link href="/s">Create</Link>
        </Button>

        <Button asChild variant="secondary" size="lg" className="w-32">
          <Link href="/s/join">Join</Link>
        </Button>

        <hr />
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
                <div className="grid grid-cols-3 gap-4 pb-4">
                  {data.map((session) => (
                    <Link
                      key={session.id}
                      className="flex flex-col items-center justify-center rounded-lg border px-3 py-6"
                      href={`/s/${session.id}`}
                    >
                      <div>{new Date(session.createdAt).toDateString()}</div>
                      <div className="text-sm">{session.deck} deck</div>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation="vertical" />
              </ScrollArea>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
