'use client'

import { PressButton } from '@/components/press-button'
import { AnimatePresence } from 'framer-motion'

function useOnlineContext() {
  return {
    state: {
      room: {
        code: 'code',
        status: 'checking',
      },
    },
  }
}

export function CheckButton({ className }: { className?: string }) {
  const {
    state: { room },
  } = useOnlineContext()

  const handleNext = () => {
    // socket.emit('room:reset', { room: room.code })
  }

  const handleCheck = () => {
    // socket.emit('room:check', { room: room.code })
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
