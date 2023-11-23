'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { SocketProvider } from '@/app/(app)/_components/socket-provider'

const queryClient = new QueryClient()

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SocketProvider>
  )
}
