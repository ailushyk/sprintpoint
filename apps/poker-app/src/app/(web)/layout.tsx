import React from 'react'

import { AppHeader } from '@/components/app-header/app-header'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      <AppHeader links={[{ href: '/dashboard', label: 'Dashboard' }]} />

      {children}
    </div>
  )
}
