'use client'

import React from 'react'
import { usePlayer } from '@/modules/game/usePlayer'

export function Welcome() {
  const { data } = usePlayer()

  if (data?.username) {
    return (
      <p className="text-lg mb-4">
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        Hello <b className="capitalize">{data.username}</b>! Play 'n' Enjoy 😎♠️
      </p>
    )
  }

  return (
    <p className="text-lg mb-4">
      {/*Hello <b className="capitalize">{username}</b>! Join to table 😎♠️*/}
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      Play 'n' Enjoy 😎♠️
    </p>
  )
}
