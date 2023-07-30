import React, { useMemo } from 'react'
import { FormDeckProps } from '@/components_next/deck/Deck'
import { AnimatePresence, motion } from 'framer-motion'
import { Control, useWatch } from 'react-hook-form'

import { cn } from '@easypoker/ui'

import { getAverageCardValue, getStatusByValues } from '@/lib/deck-utils'
import { getClosest } from '@/lib/math'
import { usePlayArea } from '@/app/room/[room]/_components/play-area-provider'

export const PickedCard = ({ sp }: { sp: number | null }) => {
  console.log('sp', sp)

  return (
    <div
      className={cn(
        'flex h-20 w-20 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 border-muted bg-popover p-4 text-4xl transition',
        sp ? 'border-primary text-primary' : 'border-muted text-muted'
      )}
    >
      <AnimatePresence mode="wait">
        {sp ? (
          <motion.div
            key={`value-${sp}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {sp}
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            -
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
