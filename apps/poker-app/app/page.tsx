'use client'

import Link from 'next/link'
import { buttonVariants } from '@easypoker/ui'

export default function Home() {
  return (
    <div className="h-screen container flex flex-col items-center justify-center">
      <div className="space-y-5 flex flex-col">
        <Link
          href="/room/create"
          className={buttonVariants({ variant: 'default' })}
        >
          Create Room
        </Link>
        <Link href="/room/join" className={buttonVariants({ variant: 'link' })}>
          Join Room
        </Link>
      </div>
    </div>
  )
}
