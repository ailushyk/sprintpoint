import Link from 'next/link'

import React from 'react'

export function TopBar({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div>
          <Link href="/" className="font-bold text-muted-foreground">
            Sprint Point
          </Link>
        </div>
        <div className="flex items-center space-x-3">{children}</div>
      </div>
    </header>
  )
}
