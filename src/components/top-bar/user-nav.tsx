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
    <UserAvatar
      name={getInitials(user?.name || user?.email)}
      image={user?.image}
    />
  )
}
