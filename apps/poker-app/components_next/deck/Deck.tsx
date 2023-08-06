'use client'

import React, { useMemo, useState } from 'react'
import { DeckFormActions } from '@/components_next/deck/deck-form-actions'
import { PickedCard } from '@/components_next/deck/PickedCard'
import { useUserActivity } from '@/components_next/deck/useUserActivity'

import {
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
import { UserProfileValues } from '@/lib/user/user'
import { MobileResult } from '@/app/(app)/room/[room]/_components/mobile-result'
import {
  FormDeckValues,
  useOnlineContext,
} from '@/app/(app)/room/[room]/_components/online-provider'

const estimateParams = ['risk', 'complexity', 'unfamiliar'] as const
const planingPokerVariablesDescription = {
  risk: 'Risk is the chance that something will go wrong. The higher the risk, the more likely it is that something will go wrong.',
  complexity:
    'Complexity is the amount of work that needs to be done. The higher the complexity, the more work there is to do.',
  unfamiliar:
    'Unfamiliarity is how well you know the work. The less familiar you are with the work, the more likely it is that something will go wrong.',
}

export const Deck = ({ user }: { user: UserProfileValues }) => {
  const { state } = useOnlineContext()
  const [sp, setSp] = useState<number | null>(null)
  const { handleUserActivity, resetUserActivity } = useUserActivity()

  const { room, deck, form, defaultValues } = state
  const { watch } = form

  // TODO:
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
          className="w-full space-y-12"
        >
          <fieldset
            disabled={room.status === 'checking'}
            className="grid w-full grid-cols-3 place-items-stretch md:grid-cols-1 md:place-items-center md:space-y-8"
          >
            {estimateParams.map((PART_OF_VALUE) => (
              <FormField
                key={PART_OF_VALUE}
                control={form.control}
                name={PART_OF_VALUE}
                render={({ field }) => (
                  <FormItem className="flex max-w-full flex-col items-center justify-center md:items-start">
                    <FormLabel className="sticky top-24 z-20 w-full border-b bg-background py-2 text-center capitalize md:static md:w-auto md:py-0 lg:border-transparent">
                      {PART_OF_VALUE}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex w-full flex-col items-center gap-2 md:flex-row md:overflow-x-auto lg:gap-3"
                      >
                        {deck.cards.map((card) => (
                          <FormItem
                            key={`${PART_OF_VALUE}-${card.name}`}
                            className={cn(
                              form.getValues(PART_OF_VALUE) === card.name &&
                                'sticky bottom-4 top-28 z-10 md:bottom-auto md:left-0 md:right-0 md:top-auto'
                            )}
                          >
                            <FormControl>
                              <input
                                type="radio"
                                {...form.register(PART_OF_VALUE)}
                                value={card.name}
                                className="peer hidden"
                              />
                            </FormControl>
                            <FormLabel className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-muted bg-popover p-4 text-xl transition hover:bg-accent hover:text-accent-foreground peer-checked:border-primary peer-checked:bg-accent md:h-14 md:w-14 lg:rounded-md">
                              {card.name}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription className="hidden max-w-md md:block">
                      {planingPokerVariablesDescription[PART_OF_VALUE]}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </fieldset>

          <DeckFormActions
            status={room.status}
            reset={() => form.reset(defaultValues)}
          />
        </form>
      </Form>

      <MobileResult user={user} />
    </div>
  )
}
