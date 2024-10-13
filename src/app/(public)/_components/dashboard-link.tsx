import Link from 'next/link'
import { auth } from '@/lib/auth/auth'
import { Button } from '@/components/ui/button'
import { SignIn } from '@/components/auth/sign-in'
import { ShineBorder } from '@/components/shine-border'

export async function DashboardLink() {
  const session = await auth()
  return (
    <div>
      {session ? (
        <ShineBorder>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard" prefetch={false}>
              Dashboard
            </Link>
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
