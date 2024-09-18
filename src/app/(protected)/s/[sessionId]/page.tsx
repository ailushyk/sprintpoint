import { CheckButton } from '@/app/(protected)/s/_components/check-button'
import { NewDeck } from '@/app/(protected)/s/_components/new-deck'
import { PickedCard } from '@/app/(protected)/s/_components/picked-card'
import { RoomTitle } from '@/app/(protected)/s/_components/room-title'
import { UsersBoard } from '@/app/(protected)/s/_components/users-board'
import { FadeInPageWrapper } from '@/components/fade-in-page-wrapper'
import { BackButton } from '@/components/top-bar/back-button'
import { TopBarContainer } from '@/components/top-bar/top-bar-container'
import { UserNav } from '@/components/top-bar/user-nav'
import { buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/ui/Icon'
import { Separator } from '@/components/ui/separator'
import { fetchSessionById } from '@/data/session-api'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

interface PageProps {
  params: { sessionId: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const sessionId = params.sessionId
  return {
    title: `On Air`,
    alternates: {
      canonical: `/s/${sessionId}`,
    },
  }
}

/**
 * TODO: In the future, the Session may be changed to an Event or Room.
 *    I’m still working on the terminology.
 */
export default async function SessionPage({ params }: PageProps) {
  const { data } = await fetchSessionById(params.sessionId)
  return (
    <FadeInPageWrapper>
      <TopBarContainer>
        <BackButton />
        <RoomTitle id={data.id} name="#1234" />
        <UserNav />
      </TopBarContainer>

      <main className="flex w-full flex-1 flex-col space-y-8 pb-40">
        <div className="sticky top-0 bg-background">
          <div className="container mx-auto flex max-w-xl items-center justify-between gap-6 py-3">
            <PickedCard sp={8} />
            <div>
              <Link
                href={`/room/${data.id}/settings`}
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                    size: 'icon',
                  }),
                  'row-[2/3]',
                )}
              >
                <Icon.mix />
              </Link>
            </div>
            <CheckButton className="h-16 w-16" />
          </div>
          <Separator />
        </div>

        <div className="container mx-auto w-full max-w-xl flex-1">
          <UsersBoard />
        </div>

        <NewDeck />
      </main>
    </FadeInPageWrapper>
  )
}
