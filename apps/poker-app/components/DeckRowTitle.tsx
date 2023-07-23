import React, { FC } from 'react'

interface DeckRowTitleProps {
  children: React.ReactNode
}

export const DeckRowTitle: FC<DeckRowTitleProps> = ({ children }) => {
  return <div className="mb-1 w-24 flex-shrink-0 capitalize">{children}</div>
}
