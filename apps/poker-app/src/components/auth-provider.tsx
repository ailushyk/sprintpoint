'use client'

import React from 'react'

import { UserProfileValues } from '@/lib/api/api-types'

const AuthContext = React.createContext<{ user?: UserProfileValues }>(null!)

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export const AuthProvider = ({
  user,
  children,
}: {
  user?: UserProfileValues
  children: React.ReactNode
}) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}
