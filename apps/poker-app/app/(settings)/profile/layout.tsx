import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'

import { AppLayout } from '@/components/AppLayout'

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout>
      <AppHeader />

      {children}
    </AppLayout>
  )
}
