'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { socket } from '@/lib/socket-client'
import { PressButton } from '@/components/buttons/press-button'
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'

export function CheckButton({ className }: { className?: string }) {
  const {
    state: { room },
  } = useOnlineContext()

  const handleNext = () => {
    socket.emit('room:reset', { room: room.code })
  }

  const handleCheck = () => {
    socket.emit('room:check', { room: room.code })
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {room.status === 'checking' ? (
          <PressButton
            key="checking"
            onClick={handleNext}
            size="lg"
            variant="destructive"
            className={className}
          >
            Next
          </PressButton>
        ) : (
          <PressButton
            key="voting"
            onClick={handleCheck}
            size="lg"
            variant="secondary"
            className={className}
          >
            Check
          </PressButton>
        )}
      </AnimatePresence>
    </div>
  )
}
