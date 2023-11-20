import React from 'react'

import { Providers } from '@/app/(app)/_components/providers'

export const metadata = {
  title: {
    default: 'Planing Poker - Sprint Point',
    template: '%s | Sprint Point',
  },
  robots: 'noindex, nofollow',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col items-center">{children}</div>
    </Providers>
  )
}
