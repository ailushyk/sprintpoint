'use client'

import { PressButtonEffect } from '@/components/press-button-effect'
import { Button } from '@/components/ui/button'
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
          <PressButtonEffect>
            <Button
              key="checking"
              variant="destructive"
              size="lg"
              onClick={handleNext}
              className={className}
            >
              Next
            </Button>
          </PressButtonEffect>
        ) : (
          <PressButtonEffect>
            <Button
              key="voting"
              onClick={handleCheck}
              size="lg"
              variant="secondary"
              className={className}
            >
              Check
            </Button>
          </PressButtonEffect>
        )}
      </AnimatePresence>
    </div>
  )
}
