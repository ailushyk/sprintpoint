import { Metadata } from 'next'
import Link from 'next/link'

import { buttonVariants, cn } from '@easypoker/ui'

import { api } from '@/lib/api'
import { RoomForm } from '@/app/(app)/_components/room-form'

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

export default async function CreateRoomPage({
  params,
}: {
  params: {
    room: string
  }
}) {
  const room = await api().room.get(params.room)
  return (
    <main className="container max-w-2xl flex-1 space-y-8 pt-8">
      <header>
        <Link
          href={`/room/${params.room}`}
          className="leading- text-sm underline-offset-2 hover:underline"
        >
          Back to room
        </Link>
        <h1 className="text-4xl font-bold">Room Settings</h1>
        <h2>Coming Soon!</h2>
      </header>

      <RoomForm room={room} />
    </main>
  )
}
