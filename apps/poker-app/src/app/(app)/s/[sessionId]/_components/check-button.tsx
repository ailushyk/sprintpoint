'use client'

import React from 'react'
import { AnimatePresence } from 'framer-motion'

import { RoomStatus } from '@easypoker/shared/src/refactor-types'

import { PressButton } from '@/components/buttons/press-button'

export function CheckButton({
  status,
  className,
}: {
  status: RoomStatus
  className?: string
}) {
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'checking' ? (
          <PressButton
            key="checking"
            size="lg"
            variant="destructive"
            className={className}
          >
            Next
          </PressButton>
        ) : (
          <PressButton
            key="voting"
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
