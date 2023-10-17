import React from 'react'

import { AppHeader } from '@/components/app-header/app-header'

export const metadata = {
  robots: 'noindex, nofollow',
}

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      <AppHeader />

      {children}
    </div>
  )
}
