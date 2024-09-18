import { SignOut } from '@/components/auth/sign-out'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth/auth'

export async function UserNav() {
  const session = await auth()
  if (!session) {
    return null
  }

  return (
    <Button variant="outline" size="sm">
      <SignOut>Sign Out</SignOut>
    </Button>
  )
}
