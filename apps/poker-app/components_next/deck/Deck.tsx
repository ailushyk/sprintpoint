'use client'

import React, { useMemo, useState } from 'react'
import { DeckFormActions } from '@/components_next/deck/deck-form-actions'
import { OfflineMessage } from '@/components_next/deck/offline-message'
import { PickedCard } from '@/components_next/deck/PickedCard'
import { useUserActivity } from '@/components_next/deck/useUserActivity'
import { AnimatePresence, motion } from 'framer-motion'

import {
  Button,
  cn,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  RadioGroup,
} from '@easypoker/ui'

import { getAverageCardValue, getStatusByValues } from '@/lib/deck-utils'
import { getClosest } from '@/lib/math'
import { socket } from '@/lib/socket-client'
import {
  FormDeckValues,
  useOnlineContext,
} from '@/app/room/[room]/_components/online-provider'

const estimateParams = ['risk', 'complexity', 'unfamiliar'] as const
const planingPokerVariablesDescription = {
  risk: 'Risk is the chance that something will go wrong. The higher the risk, the more likely it is that something will go wrong.',
  complexity:
    'Complexity is the amount of work that needs to be done. The higher the complexity, the more work there is to do.',
  unfamiliar:
    'Unfamiliarity is how well you know the work. The less familiar you are with the work, the more likely it is that something will go wrong.',
}

export const Deck = () => {
  const { state } = useOnlineContext()
  const [sp, setSp] = useState<number | null>(null)
  const { handleUserActivity, resetUserActivity } = useUserActivity()

  const { room, deck, form, defaultValues } = state
  const { watch } = form

  const onSubmit = (data: FormDeckValues) => {
    if (room.status === 'checking') {
      socket.emit('room:reset', { room: room.code })
      form.reset(defaultValues)
    } else {
      socket.emit('room:check', { room: room.code })
    }
  }

  const deckValues = useMemo(() => {
    return deck.cards.map((card) => card.value)
  }, [deck.cards])

  React.useEffect(
    () => {
      const subscription = watch((value) => {
        let status = getStatusByValues(Object.values(value))
        if (status === 'voted') {
          const average = getAverageCardValue(Object.values(value), deck.cards)
          const closest = getClosest(average, deckValues)
          setSp(closest)
          socket.emit('user:vote', { room: room.code, value: closest })
          // clear timer
          resetUserActivity()
        } else if (status === 'voting') {
          setSp(null)
          socket.emit('user:vote', { room: room.code, value: null })
          // check if user is inactive
          handleUserActivity()
        } else if (status === 'idle') {
          setSp(null)
          socket.emit('user:reset', { room: room.code })
        }
      })
      return () => {
        subscription.unsubscribe()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch]
  )

  return (
    <div className="flex flex-col items-center gap-8">
      <PickedCard.Wrapper>
        <PickedCard sp={sp} />
      </PickedCard.Wrapper>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-9"
        >
          <fieldset
            disabled={room.status === 'checking'}
            className="grid grid-cols-3 place-items-center gap-9 md:grid-cols-1"
          >
            <div className="col-span-3 hidden md:col-span-full">
              <Button type="submit" className="w-40">
                confirm
              </Button>
            </div>

            {estimateParams.map((PART_OF_VALUE) => (
              <FormField
                key={PART_OF_VALUE}
                control={form.control}
                name={PART_OF_VALUE}
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center justify-center md:items-start">
                    <FormLabel className="sticky top-28 z-10 capitalize md:static md:w-auto md:py-0">
                      {PART_OF_VALUE}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3 md:flex-row"
                      >
                        {deck.cards.map((card) => (
                          <FormItem
                            key={`${PART_OF_VALUE}-${card.name}`}
                            className={cn(
                              form.getValues(PART_OF_VALUE) === card.name &&
                                'sticky bottom-4 top-32 z-10 md:static'
                            )}
                          >
                            <FormControl>
                              <input
                                type="radio"
                                {...form.register(PART_OF_VALUE)}
                                value={card.name}
                                className="peer sr-only"
                              />
                            </FormControl>
                            <FormLabel className="flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 text-xl transition hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-accent">
                              {card.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription className="hidden md:block md:max-w-xl">
                      {planingPokerVariablesDescription[PART_OF_VALUE]}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </fieldset>

          <AnimatePresence mode="wait">
            {socket.connected ? (
              <motion.div
                key="deck-form-actions"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <DeckFormActions
                  status={room.status}
                  reset={() => form.reset(defaultValues)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="deck-form-offline"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: 'easeOut', delay: 1 }}
              >
                <OfflineMessage />
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </Form>
    </div>
  )
}
