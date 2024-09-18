'use client'

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

import {
  CardValue,
  getCardValueByName,
} from '@/app/(protected)/s/_components/deck-utils'
import { PressButton } from '@/components/press-button'
import { Separator } from '@/components/ui/separator'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { slideToBottomVariants } from '@/lib/animation-variants'
import { useWindowWidth } from '@/lib/window-width'

const useOnlineContext = () => {
  return {
    state: {
      room: {
        status: 'voting',
        code: '123456',
      },
      deck: {
        cards: [
          { name: '0' },
          { name: '1/2' },
          { name: '1' },
          { name: '2' },
          { name: '3' },
          { name: '5' },
          { name: '8' },
          { name: '13' },
          { name: '20' },
          { name: '40' },
          { name: '100' },
          { name: '?' },
        ],
      },
    },
  }
}
const useUserActivity = () => {
  const handleUserActivity = () => {}
  const resetUserActivity = () => {}
  return { handleUserActivity, resetUserActivity }
}
export const NewDeck = () => {
  const {
    state: { room, deck },
  } = useOnlineContext()
  const { handleUserActivity, resetUserActivity } = useUserActivity()
  const [selectedCard, setSelectedCard] = React.useState<string>('')
  const scrollContainerRef = useRef(null)
  const { scrollX } = useScroll({
    container: scrollContainerRef,
  })

  useEffect(
    () => {
      if (room.status === 'voting') {
        const value = getCardValueByName(selectedCard, deck.cards)
        console.log('Voted:', value)
        // socket.emit('user:vote', { room: room.code, value })
        handleUserActivity()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [room.code, room.status, selectedCard],
  )

  useEffect(
    () => {
      if (room.status === 'voting') {
        setSelectedCard('')
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [room.status],
  )

  return (
    <motion.div
      className="min-w-xl fixed inset-x-0 bottom-0"
      initial="close"
      animate={room.status === 'checking' ? 'close' : 'open'}
      variants={slideToBottomVariants}
    >
      <div className="border-t-2 bg-background">
        <div className="my-2 text-center text-xs font-semibold text-muted-foreground">
          {selectedCard || 'Select a card'}
        </div>

        <div className="relative flex flex-col items-center">
          <Separator
            orientation="vertical"
            className="absolute top-0 bg-orange-600"
          />
          <ToggleGroup
            ref={scrollContainerRef}
            type="single"
            value={selectedCard}
            onValueChange={setSelectedCard}
            className="simple-deck scrollbar-none relative flex w-full snap-x snap-mandatory items-end gap-[.8rem] overflow-x-auto pb-6 pt-4 hover:overscroll-contain md:gap-4"
            orientation="horizontal"
            disabled={room.status === 'checking'}
          >
            {deck.cards.map((card) => (
              <Card
                key={`simple-deck-${card.name}`}
                card={card}
                progressX={scrollX}
              />
            ))}
          </ToggleGroup>
        </div>
      </div>
    </motion.div>
  )
}

function Card(props: { card: CardValue; progressX: MotionValue<number> }) {
  const { card, progressX } = props
  const w = useWindowWidth()
  const ref = useRef<HTMLDivElement>(null)
  const distance = useTransform(progressX, (latest) => {
    const bounce = ref.current?.getBoundingClientRect() || {
      x: 0,
      width: 0,
    }
    return w / 2 - bounce.width / 2 - bounce.x
  })

  const opacity = useTransform(distance, [-w / 2, 0, w / 2], [0.2, 1, 0.2])
  const scale = useTransform(
    distance,
    [-w, -w / 3, 0, w / 3, w],
    [0.2, 0.9, 1, 0.9, 0.2],
  )
  const handleItemFocus = (event) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // Scroll to the center of the container
      inline: 'center', // Scroll to the horizontal center of the container
    })
  }

  return (
    <div ref={ref} className="shrink-0 snap-center">
      <motion.div style={{ opacity: opacity, scaleX: scale }}>
        <ToggleGroupItem value={card.name} asChild>
          <PressButton
            className="data-[state=on]:bg-accent-card flex h-[4.5rem] w-16 select-none rounded-xl border-2 bg-card p-4 text-xl transition data-[state=on]:border-primary md:h-20 md:w-20"
            onClick={handleItemFocus}
            variant="ghost"
          >
            {card.name}
          </PressButton>
        </ToggleGroupItem>
      </motion.div>
    </div>
  )
}
