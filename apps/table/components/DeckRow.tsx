import React, { FC } from 'react'

export interface DeckRowProps {
  children: React.ReactNode
}

export const DeckRow: FC<DeckRowProps> = ({ children }) => {
  return <div className="flex items-center">{children}</div>
}
