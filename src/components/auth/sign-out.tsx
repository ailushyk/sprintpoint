import { signOut } from '@/lib/auth/auth'
import React from 'react'

export function SignOut({ children, ...props }: { children: React.ReactNode }) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut({
          redirectTo: '/',
        })
      }}
      className="w-full"
    >
      <button {...props}>{children}</button>
    </form>
  )
}
