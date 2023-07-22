import React from 'react'
import { AppHeader } from '@/components_next/app-header/app-header'

import { AppLayout } from '@/components/AppLayout'

export default function HomeLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <AppLayout>
      <AppHeader />

      {children}
      {modal}
    </AppLayout>
  )
}
