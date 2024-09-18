import { signIn } from '@/lib/auth/auth'
import { AUTH_DEFAULT_REDIRECT_URL } from '@/routes'
import React from 'react'

interface LoginButtonProps {
  children: React.ReactNode
  redirectTo?: string
}

export function SignIn({ children, redirectTo, ...props }: LoginButtonProps) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('keycloak', {
          redirectTo: redirectTo || AUTH_DEFAULT_REDIRECT_URL,
        })
      }}
    >
      <button {...props}>{children}</button>
    </form>
  )
}
