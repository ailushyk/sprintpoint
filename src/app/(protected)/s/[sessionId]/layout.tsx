import React from 'react'
import { RoomTitle } from '@/app/(protected)/s/_components/room-title'
import { FadeInPageWrapper } from '@/components/fade-in-page-wrapper'
import { BackButton } from '@/components/top-bar/back-button'
import { TopBarContainer } from '@/components/top-bar/top-bar-container'
import { UserNav } from '@/components/top-bar/user-nav'
import { fetchSessionById } from '@/data/session-api'

interface PageProps {
  children: React.ReactNode
  params: { sessionId: string }
}

export default async function Layout({ children, params }: PageProps) {
  const { data } = await fetchSessionById(params.sessionId)
  return (
    <FadeInPageWrapper className="h-full">
      <TopBarContainer>
        <BackButton />
        <RoomTitle id={data.id} name="#1234" />
        <UserNav />
      </TopBarContainer>

      {children}
    </FadeInPageWrapper>
  )
}
