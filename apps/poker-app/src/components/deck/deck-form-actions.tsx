import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { RoomStatusValue } from '@easypoker/shared'
import { Button } from '@easypoker/ui'

import { socket } from '@/lib/socket-client'
import { OfflineMessage } from '@/components/deck/offline-message'

export function DeckFormActions(props: {
  status: RoomStatusValue
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
      <Button
        key="reset-action"
        type="reset"
        onClick={props.reset}
        variant="outline"
        className="w-40"
        disabled={props.status === 'checking'}
      >
        Reset
      </Button>

      <AnimatePresence mode="wait">
        {socket.connected ? (
          <motion.div
            key="deck-form-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {props.status === 'checking' ? (
              <Button type="submit" size="lg" variant="destructive">
                Next vote
              </Button>
            ) : (
              <Button type="submit" size="lg">
                Check
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="deck-form-offline"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut', delay: 0.5 }}
          >
            <OfflineMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
