import React, { FC } from 'react'

import { cn } from '@easypoker/ui'

interface DeckProps {
  className?: string
  children: React.ReactNode
}

export const Deck: FC<DeckProps> = ({ className, children }) => {
  return (
    <div className={cn(['flex overflow-x-auto pb-4', className])}>
      {children}
    </div>
  )
}
