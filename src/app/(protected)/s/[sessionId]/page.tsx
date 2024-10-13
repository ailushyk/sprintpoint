import { Metadata } from 'next'
import Link from 'next/link'
import { CheckButton } from '@/app/(protected)/s/_components/check-button'
import { InteractiveDeck } from '@/app/(protected)/s/_components/interactive-deck'
import { PickedCard } from '@/app/(protected)/s/_components/picked-card'
import { UsersBoard } from '@/app/(protected)/s/_components/users-board'
import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/Icon'
import { Separator } from '@/components/ui/separator'
import { fetchCardsByDeckSlug } from '@/data/card-api'
import { fetchSessionById } from '@/data/session-api'

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
  const cards = await fetchCardsByDeckSlug({
    deckSlug: data.deck.slug,
  })

  return (
    <main className="flex w-full flex-1 flex-col space-y-8 pb-40">
      <div className="sticky top-0 bg-background">
        {/* TOP PANEL */}
        <div className="container mx-auto flex max-w-xl items-center justify-between gap-6 py-3">
          <PickedCard sp={8} className="glass-overlay" />
          <Button asChild variant="ghost" size="icon">
            <Link href={`/s/${data.id}/settings`}>
              <Icon.mix />
            </Link>
          </Button>
          <CheckButton className="h-16 w-16 border-2 border-red-800" />
        </div>
        {/* TOP PANEL END */}
        <Separator />
      </div>

      <div className="container mx-auto w-full max-w-xl flex-1">
        <UsersBoard />
      </div>

      <InteractiveDeck cards={cards.data} />
    </main>
  )
}
