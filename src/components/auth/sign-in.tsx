import { signIn } from '@/lib/auth/auth'
import { AUTH_DEFAULT_REDIRECT_URL } from '@/routes'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'

interface LoginButtonProps {
  children: React.ReactNode
  redirectTo?: string
  asChild?: boolean
}

export function SignIn({ children, redirectTo, asChild }: LoginButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <form
      action={async () => {
        'use server'
        await signIn('keycloak', {
          redirectTo: redirectTo || AUTH_DEFAULT_REDIRECT_URL,
        })
      }}
    >
      <Component>{children}</Component>
    </form>
  )
}
