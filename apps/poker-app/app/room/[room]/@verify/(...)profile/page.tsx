import { api } from '@/lib/api'
import { UserDialog } from '@/app/room/[room]/@verify/(...)profile/_components/user-dialog'

export default function DefaultModal() {
  const user = api().user.get()

  return (
    <>
      <UserDialog defaultValues={user} />
    </>
  )
}
