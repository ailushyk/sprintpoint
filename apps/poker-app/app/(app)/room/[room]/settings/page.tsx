import Link from 'next/link'

import { buttonVariants, cn } from '@easypoker/ui'

import { CreateRoomForm } from '@/app/(app)/_components/create-room-form'

export default function CreateRoomPage({
  params,
}: {
  params: {
    room: string
  }
}) {
  return (
    <main className="container max-w-2xl flex-1 space-y-8">
      <header>
        <h1 className="text-4xl font-bold">Room Settings</h1>
        <Link
          href={`/room/${params.room}`}
          className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
        >
          Back to room
        </Link>
      </header>
      <CreateRoomForm />
    </main>
  )
}
