import { SignIn } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth/auth'
import Link from 'next/link'

export async function DashboardLink() {
  const session = await auth()
  return (
    <div>
      {session ? (
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <SignIn>Sigh In</SignIn>
        </Button>
      )}
    </div>
  )
}
