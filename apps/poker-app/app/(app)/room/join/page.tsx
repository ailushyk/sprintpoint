import Link from 'next/link'

import { buttonVariants, cn } from '@easypoker/ui'

import { JoinRoomForm } from '@/app/(app)/_components/join-room-form'

export const metadata = {
  title: 'Join Room',
  alternates: {
    canonical: '/room/create',
  },
}

export default function JoinRoomPage() {
  return (
    <main className="container max-w-2xl flex-1 space-y-8">
      <header>
        <h1 className="text-4xl font-bold">Join Room</h1>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: 'link' }), 'p-0')}
        >
          Back to dashboard
        </Link>
      </header>
      <JoinRoomForm />
    </main>
  )
}
