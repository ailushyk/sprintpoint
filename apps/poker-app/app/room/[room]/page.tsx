import React from 'react'

import { getUsername } from '@/app/playActions'
import { AppHeader } from '@/app/room/_components/app-header'
import { Deck } from '@/app/room/_components/deck/Deck'

export default function PlayRoomPage({ params }: { params: { room: string } }) {
  const [openDialog, setOpenDialog] = React.useState(false)

  const checkUsername = async () => {
    const username = await getUsername()
    if (!username) {
      setOpenDialog(true)
    }
  }

  const saveUsername = async (username: string) => {
    // await localStorage.setItem('username', username)
    setOpenDialog(false)
  }

  return (
    <>
      <AppHeader />

      <main className="container flex-1">
        <h1>room: {params.room}</h1>

        <Deck />
      </main>
    </>
  )
}
