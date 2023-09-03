import React from 'react'

import { AppHeader } from '@/components/app-header/app-header'

export const metadata = {
  title: {
    default: 'Planing Poker - Sprint Point',
    template: '%s | Sprint Point',
  },
  robots: 'noindex, nofollow',
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <AppHeader />

      {children}
    </div>
  )
}
