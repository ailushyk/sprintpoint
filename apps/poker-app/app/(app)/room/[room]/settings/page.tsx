import { Metadata } from 'next'

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
        <h1 className="text-4xl font-bold">Room Settings</h1>
        <p>Coming Soon!</p>
      </header>

      <RoomForm room={room} />
    </main>
  )
}
