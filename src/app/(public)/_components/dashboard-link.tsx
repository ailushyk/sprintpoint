import { SignIn } from '@/components/auth/sign-in'
import { ShineBorder } from '@/components/shine-border'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth/auth'
import Link from 'next/link'

export async function DashboardLink() {
  const session = await auth()
  return (
    <div>
      {session ? (
        <ShineBorder>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </ShineBorder>
      ) : (
        <Button variant="outline" size="sm" asChild>
          <SignIn>Sigh In</SignIn>
        </Button>
      )}
    </div>
  )
}
