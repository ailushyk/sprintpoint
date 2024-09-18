import { SignOut } from '@/components/auth/sign-out'
import { Button } from '@/components/ui/button'
import { UserAvatar } from '@/components/user-avatar'
import { auth } from '@/lib/auth/auth'
import { getInitials } from '@/lib/get-initials'

export async function UserNav() {
  const session = await auth()
  if (!session) {
    return null
  }
  const { user } = session

  return (
    <>
      <Button variant="outline" size="sm" asChild>
        <SignOut>Sign Out</SignOut>
      </Button>
      <UserAvatar
        name={getInitials(user?.name || user?.email)}
        image={user?.image}
      />
    </>
  )
}
