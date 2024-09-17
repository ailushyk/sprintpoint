import { SignOut } from '@/components/auth/sign-out'
import { auth } from '@/lib/auth/auth'
import Link from 'next/link'

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div>
      <h1>Dashboard</h1>
      <nav>
        <Link href="/">home</Link>
        <SignOut>Log Out</SignOut>
      </nav>
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
