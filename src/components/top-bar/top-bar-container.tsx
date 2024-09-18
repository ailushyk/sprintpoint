import React from 'react'

export function TopBarContainer({ children }: { children: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container grid h-14 grid-cols-[auto_1fr_auto] place-items-center">
        {children}
      </div>
    </header>
  )
}
