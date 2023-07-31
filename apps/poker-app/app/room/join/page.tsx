import { AppHeader } from '@/components_next/app-header/app-header'

import { JoinRoomForm } from '@/app/(home)/_components/join-room-form'

export default function JoinRoomPage() {
  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <h1>Join Room</h1>

        <div className="flex h-full items-center justify-center">
          <JoinRoomForm />
        </div>
      </main>
    </>
  )
}
