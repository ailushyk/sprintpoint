import { SignIn } from '@/components/auth/sign-in'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth/auth'
import Link from 'next/link'

export async function UserNav() {
  const session = await auth()
  return (
    <div>
      {session ? (
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
      ) : (
        <SignIn asChild>
          <Button variant="outline" size="sm">
            Sigh In
          </Button>
        </SignIn>
      )}
    </div>
  )
}
