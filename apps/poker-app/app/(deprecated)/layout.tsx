import React from 'react'
import { MainLayout } from '@/components_next/MainLayout'

export default function DeprecatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MainLayout>{children}</MainLayout>
}
