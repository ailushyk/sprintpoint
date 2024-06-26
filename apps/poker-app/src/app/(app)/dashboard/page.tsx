import Link from 'next/link'

import { buttonVariants, cn } from '@easypoker/ui'

import { StartSession } from '@/components/start-session'
import { DashboardRooms } from '@/app/(app)/dashboard/_components/dashboard-rooms'

export const metadata = {
  title: 'Efficient Agile Estimation with Sprint Point: Plan Your Success',
  description:
    'There are many ways to estimate work. Planning Poker is one of the most popular. It is a simple and effective way to estimate work with your team.',
  alternates: {
    canonical: '/dashboard',
  },
}

export default async function DashboardPage() {
  return (
    <main className="h-full w-full space-y-8">
      <header className="container space-y-1 p-8 text-center">
        <h1 className="text-4xl font-bold">
          Start estimating smarter with Sprint Point!
        </h1>
      </header>

      <div className="flex flex-col items-center justify-center gap-3 pb-8 md:flex-row-reverse">
        <StartSession>Play</StartSession>

        <Link
          href="/room/join"
          className={cn(buttonVariants({ variant: 'secondary', size: 'lg' }))}
        >
          Join
        </Link>

        <hr />
      </div>

      <DashboardRooms />
    </main>
  )
}
