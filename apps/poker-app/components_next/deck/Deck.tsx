'use client'

import React, { useMemo, useState } from 'react'
import { PickedCard } from '@/components_next/deck/PickedCard'
import { UseFormReturn } from 'react-hook-form'

import {
  Button,
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
  FormDeckProps,
  usePlayArea,
} from '@/app/room/[room]/_components/play-area-provider'

const estimateParams = ['risk', 'complexity', 'unfamiliar'] as const
const planingPokerVariablesDescription = {
  risk: 'Risk is the chance that something will go wrong. The higher the risk, the more likely it is that something will go wrong.',
  complexity:
    'Complexity is the amount of work that needs to be done. The higher the complexity, the more work there is to do.',
  unfamiliar:
    'Unfamiliarity is how well you know the work. The less familiar you are with the work, the more likely it is that something will go wrong.',
}

export const Deck = ({
  form,
  defaultValues,
}: {
  form: UseFormReturn<FormDeckProps>
  defaultValues: FormDeckProps
}) => {
  const { deck, room, status } = usePlayArea()
  const [sp, setSp] = useState<number | null>(null)

  const { watch } = form

  const onSubmit = (data: FormDeckProps) => {
    if (status === 'checking') {
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
      const subscription = watch((value, { name, type }) => {
        let status = getStatusByValues(Object.values(value))
        if (status === 'voted') {
          const average = getAverageCardValue(Object.values(value), deck.cards)
          const closest = getClosest(average, deckValues)
          setSp(closest)
          socket.emit('user:vote', { room: room.code, value: closest })
        } else if (status === 'voting') {
          setSp(null)
          socket.emit('user:vote', { room: room.code, value: null })
        } else if (status === 'idle') {
          setSp(null)
          socket.emit('user:reset', { room: room.code })
        }
      })
      return () => subscription.unsubscribe()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [watch]
  )

  return (
    <div className="flex flex-col items-center gap-8">
      <div>
        <PickedCard sp={sp} />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-9"
        >
          <fieldset
            disabled={status === 'checking'}
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
                    <FormLabel className="capitalize">
                      {PART_OF_VALUE}
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3 md:flex-row"
                      >
                        {deck.cards.map((card) => (
                          <FormItem key={`${PART_OF_VALUE}-${card.name}`}>
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

          <div className="flex items-center justify-center gap-6">
            {status === 'checking' ? (
              <Button type="submit" className="w-40">
                Next vote
              </Button>
            ) : (
              <>
                <Button
                  key="reset-action"
                  type="reset"
                  onClick={() => {
                    form.reset(defaultValues)
                  }}
                  variant="outline"
                  className="w-40"
                >
                  Reset
                </Button>

                <Button type="submit" className="w-40">
                  Check
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}
