import { AppHeader } from '@/components_next/app-header/app-header'

import { CreateRoomForm } from '@/app/(home)/_components/create-room-form'

export default function CreateRoomPage() {
  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <h1>Create Room</h1>

        <div className="flex h-full items-center justify-center">
          <CreateRoomForm />
        </div>
      </main>
    </>
  )
}
