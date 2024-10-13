import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toast/toaster'
import { TailwindIndicator } from '@/components/tailwind-indicator'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://sprintpoint.app'),
  title: 'Planing Poker - Sprint Point',
  description:
    'The Planning Poker app is a user-friendly and efficient tool for estimating project scope. It saves time by eliminating lengthy discussions and debates among team members. The app enables team members to cast their votes simultaneously and anonymously, and then reveal their votes together. This anonymity allows everyone to express their opinions freely without fear of judgment. Additionally, the app allows teams to track project progress and make adjustments to their plan as needed, helping them stay on track with their goals and deadlines. Overall, the Planning Poker app is an essential tool for agile teams looking to streamline their work process and ensure successful project completion.',
  robots: 'index, follow',
  keywords: [
    'Sprint Point',
    'Agile',
    'Planning Poker',
    'Planning Poker Online',
    'online',
    'Scrum poker',
    'Scrum',
    'Extreme Programming',
    'Estimation',
    'Agile Estimation',
    'Agile Planning',
    'Agile Planning Poker',
    'Planning Poker Online',
    'Planning Poker App',
    'Planning Poker Tool',
    'Planning Poker Software',
    'Planning Poker Cards',
  ],
  authors: [
    {
      name: 'Alex I.',
      url: 'https://github.com/ailushyk',
    },
  ],
  creator: 'Alex I.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('dark', inter.className)}>
        {children}

        <Toaster />
        <TailwindIndicator />
      </body>
    </html>
  )
}
