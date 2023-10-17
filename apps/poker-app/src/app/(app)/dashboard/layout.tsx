import React from 'react'

import { AppHeader } from '@/components/app-header/app-header'

export default function DashboardLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      <AppHeader />

      {children}

      {modal}
    </>
  )
}
