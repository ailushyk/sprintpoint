import { Button } from '@/components/ui/button'
import React from 'react'
import { signOut } from '@/lib/auth/auth'

export function SignOut({ children }: { children: React.ReactNode }) {
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
      <Button
        variant="ghost"
        size="sm"
        className="flex w-full justify-start gap-1"
      >
        {children}
      </Button>
    </form>
  )
}