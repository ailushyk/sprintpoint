'use client'

import { useEffect, useState } from 'react'
import io from 'socket.io-client'

export const SocketRoomComponent = ({ room }: { room: string }) => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET_API_URL)
    // client-side
    socket.on('connect', () => {
      console.log('socket connected')
      console.log(socket.id)
    })

    // socket.on('message', (data) => {
    //   setMessage(data)
    // })

    return () => {
      // cleanup the socket connection when the component unmounts
      socket.disconnect()
    }
  }, [])

  return null
}
