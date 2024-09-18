import { TopBar } from '@/components/top-bar/top-bar'
import { UserNav } from '@/components/top-bar/user-nav'
import { auth } from '@/lib/auth/auth'
import { fetcher } from '@/lib/fetcher'

export default async function DashboardPage() {
  const session = await auth()
  const sessions = await fetcher('/sessions')

  return (
    <div>
      <TopBar>
        <UserNav />
      </TopBar>
      <h1>Dashboard</h1>
      <div>
        <h2>Sessions</h2>
        <code>
          <pre>{JSON.stringify(sessions.data, null, 2)}</pre>
        </code>
      </div>
      <div>
        {session ? (
          <p>Logged in as {session.user?.name}</p>
        ) : (
          <p>Not logged in</p>
        )}
      </div>
    </div>
  )
}
