import React from 'react'
import Link from 'next/link'
import { AppHeader } from '@/components_next/app-header/app-header'

import { buttonVariants, cn } from '@easypoker/ui'

import { AppLayout } from '@/components/AppLayout'

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppLayout>
      <AppHeader links={[{ href: '/dashboard', label: 'Dashboard' }]} />

      {children}
    </AppLayout>
  )
}
