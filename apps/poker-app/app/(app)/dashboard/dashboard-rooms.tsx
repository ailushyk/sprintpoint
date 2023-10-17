import Link from 'next/link'

import { api } from '@/lib/api/api'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export async function DashboardRooms() {
  const user = await api().user.me()
  const rooms = user ? await api().user.rooms() : []

  return (
    <div className="container space-y-1">
      <h2 className="text-2xl font-bold">Your rooms</h2>

      <div className="space-y-4">
        {rooms.length === 0 ? (
          <p>
            You don&apos;t have any rooms yet. Create one or join one to get.
            Coming Soon.
          </p>
        ) : (
          <>
            <p>Here are the rooms you&apos;ve created or joined.</p>
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {rooms.map((room) => (
                    <Link
                      key={room.id}
                      className="flex w-48 flex-col items-center justify-center rounded-lg border px-3 py-6"
                      href={`/room/${room.code}`}
                    >
                      <div>{room.updatedAt.toDateString()}</div>
                      <div className="text-xs">{room.code}</div>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
