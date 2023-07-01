import React, { FC } from 'react'

interface DeckRowTitleProps {
  children: React.ReactNode
}

export const DeckRowTitle: FC<DeckRowTitleProps> = ({ children }) => {
  return <div className="flex-shrink-0 w-24 mb-1 capitalize">{children}</div>
}
