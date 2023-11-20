import React from 'react'
import { notFound } from 'next/navigation'

import { api } from '@/lib/api/api'
import { AppHeader } from '@/components/app-header/app-header'
import { SessionClient } from '@/app/(app)/s/[sessionId]/_components/session-client'

export default async function SessionPage({ params }) {
  const fastSession = await api().session.get(params.sessionId)
  if (!fastSession) {
    notFound()
  }

  return (
    <>
      <AppHeader />

      <SessionClient session={fastSession} />
    </>
  )
}
