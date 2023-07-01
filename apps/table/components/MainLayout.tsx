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
    <div className="max-w-4xl container mx-auto px-4">
      <header className="py-8 flex justify-between items-center">
        <div className="w-6 h-6">
          {pathname === '/' ? null : (
            <button onClick={() => navigate.back()} className="text-zinc-400">
              <ArrowLeft />
            </button>
          )}
        </div>
        <h1 className=" uppercase font-bold text-xl text-center">
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
