'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft } from '@/icons/ArrowLeft'
import { Gear } from '@/icons/Gear'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useRouter()
  const pathname = usePathname()

  return (
    <div className="container mx-auto max-w-4xl px-4">
      <header className="flex items-center justify-between py-8">
        <div className="h-6 w-6">
          {pathname === '/' ? null : (
            <button onClick={() => navigate.back()} className="text-zinc-400">
              <ArrowLeft />
            </button>
          )}
        </div>
        <h1 className=" text-center text-xl font-bold uppercase">
          <Link href="/">Easy Poker</Link>
        </h1>
        <Link href="/profile" className="w-6 text-zinc-400 hover:text-zinc-600">
          <Gear />
        </Link>
      </header>

      {children}
    </div>
  )
}
