import './globals.css'

import React from 'react'
import { Inter } from 'next/font/google'
import { UIProvider } from '@easypoker/ui'

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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  )
}
