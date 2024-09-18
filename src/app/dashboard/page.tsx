import { AppHeader } from '@/components/app-header/app-header'
import { UserNav } from '@/components/app-header/user-nav'
import { auth } from '@/lib/auth/auth'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div>
      <AppHeader>
        <UserNav />
      </AppHeader>
      <h1>Dashboard</h1>
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
