import './globals.css'

import React from 'react'
import { Inter } from 'next/font/google'

import { MainLayout } from '@/components/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Easy Poker App',
  description: 'Easy Poker App - play poker with your team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}
