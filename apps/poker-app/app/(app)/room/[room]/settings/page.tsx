import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants, cn } from '@easypoker/ui'

import { CreateRoomForm } from '@/app/(app)/_components/create-room-form'

interface PlayRoomPageProps {
  params: { room: string }
}

export async function generateMetadata({
  params,
}: PlayRoomPageProps): Promise<Metadata> {
  // read route params
  const room = params.room

  return {
    title: `Settings - ${room}`,
    // openGraph: {
    //   images: ['/some-specific-page-image.jpg', ...previousImages],
    // },
    alternates: {
      canonical: `/room/${room}/settings`,
    },
  }
}

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
