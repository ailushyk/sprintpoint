'use client'

import { PureCard } from '@/app/(protected)/s/_components/pure-card'
import { useInteractiveDeck } from '@/app/(protected)/s/_components/use-interactive-deck'
import { Separator } from '@/components/ui/separator'
import { Card } from '@/data/card-api'
import { slideToBottomVariants } from '@/lib/animation-variants'
import { cn } from '@/lib/utils'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { motion } from 'framer-motion'

const state = {
  status: 'voting',
  code: '#1234',
}

export const InteractiveDeck = ({ cards }: { cards: Card[] }) => {
  const { containerRef, selectedCard, onSelectCard } = useInteractiveDeck({
    cards,
  })

  return (
    <motion.div
      className="min-w-xl fixed inset-x-0 bottom-0"
      initial="close"
      animate={state.status === 'checking' ? 'close' : 'open'}
      variants={slideToBottomVariants}
    >
      <div className="relative overscroll-contain border-t-2 bg-background">
        {/* Header */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mt-8 py-2 text-center text-xs font-semibold text-muted-foreground">
            {selectedCard?.title || 'Select a card'}
          </div>
          <Separator orientation="vertical" className="bg-orange-600" />
        </div>

        {/* Cards */}
        <ToggleGroup.Root
          type="single"
          aria-label="Your vote value"
          onValueChange={onSelectCard}
        >
          {/* Scroll Container */}
          <div
            ref={containerRef}
            className={cn(
              'interactive-deck scrollbar-none relative flex min-w-0 pb-6 pt-12 md:gap-4',
              'max-w-full snap-x snap-mandatory gap-[.8rem] overflow-x-auto',
            )}
          >
            {cards.map((card) => (
              <PureCard
                key={`simple-deck-${card.id}`}
                asChild
                className="shrink-0 snap-center"
                data-card-id={card.id}
              >
                <ToggleGroup.Item
                  aria-label={`Select ${card.title}`}
                  value={card.id}
                >
                  {card.title}
                </ToggleGroup.Item>
              </PureCard>
            ))}
          </div>
        </ToggleGroup.Root>
      </div>
    </motion.div>
  )
}
