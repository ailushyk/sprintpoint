'use client'

import React, { useEffect, useRef } from 'react'
import { useUserActivity } from '@/components_next/deck/useUserActivity'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'

import { CardValue } from '@easypoker/shared'
import { Separator, ToggleGroup } from '@easypoker/ui'

import { slideToBottomVariants } from '@/lib/animation-variants'
import { getCardValueByName } from '@/lib/deck-utils'
import { socket } from '@/lib/socket-client'
import { useWindowWidth } from '@/lib/window-width'
import { useOnlineContext } from '@/app/(app)/room/[room]/_components/online-provider'

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
        let value = getCardValueByName(selectedCard, deck.cards)
        socket.emit('user:vote', { room: room.code, value })
        handleUserActivity()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [room.code, room.status, selectedCard]
  )

  useEffect(
    () => {
      if (room.status === 'voting') {
        setSelectedCard('')
        resetUserActivity()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [room.status]
  )

  return (
    <motion.div
      className="min-w-xl fixed inset-x-0 bottom-0"
      initial="close"
      animate={room.status === 'voting' ? 'open' : 'close'}
      variants={slideToBottomVariants}
    >
      <div className="border-t-2 bg-background">
        <div className="my-2 text-center text-xs font-semibold text-muted-foreground">
          {selectedCard || 'Select a card'}
        </div>

        <div className="relative flex flex-col items-center py-4 md:pt-6">
          <Separator
            orientation="vertical"
            className="absolute top-0 bg-orange-600"
          />
          <ToggleGroup.Root
            ref={scrollContainerRef}
            type="single"
            value={selectedCard}
            onValueChange={setSelectedCard}
            className="simple-deck scrollbar-none relative flex w-full snap-x snap-mandatory items-end gap-3 overflow-x-auto md:gap-4"
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
          </ToggleGroup.Root>
        </div>
      </div>
    </motion.div>
  )
}

function Card(props: { card: CardValue; progressX: MotionValue<number> }) {
  let { card, progressX } = props
  const w = useWindowWidth()
  const ref = useRef<HTMLDivElement>(null)
  const distance = useTransform(progressX, (latest) => {
    const bounce = ref.current?.getBoundingClientRect() || {
      x: 0,
      width: 0,
    }
    return w / 2 - bounce.width / 2 - bounce.x
  })

  const size = useTransform(distance, [-w / 2, 0, w / 2], [0.2, 1, 0.2])
  const handleItemFocus = (event) => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // Scroll to the center of the container
      inline: 'center', // Scroll to the horizontal center of the container
    })
  }

  return (
    <div ref={ref} className="shrink-0 snap-center">
      <motion.div style={{ opacity: size }}>
        <ToggleGroup.Item
          className="flex h-16 w-16 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 text-xl transition data-[state=on]:border-primary data-[state=on]:bg-accent md:h-20 md:w-20"
          value={card.name}
          onClick={handleItemFocus}
        >
          {card.name}
        </ToggleGroup.Item>
      </motion.div>
    </div>
  )
}
