import Link from 'next/link'

import { TopBarContainer } from '@/components/top-bar/top-bar-container'
import React from 'react'

export function TopBar({ children }: { children?: React.ReactNode }) {
  return (
    <TopBarContainer>
      <div>
        <Link href="/" className="font-bold text-muted-foreground">
          Sprint Point
        </Link>
      </div>
      <div />
      <div className="flex items-center space-x-3">{children}</div>
    </TopBarContainer>
  )
}
