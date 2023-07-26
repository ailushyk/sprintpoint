'use client'

import React from 'react'
import { DeckValue } from '@/components_next/deck/deck.api'
import { PickedCard } from '@/components_next/deck/PickedCard'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

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

const estimateParams = ['risk', 'complexity', 'unfamiliar'] as const
const planingPokerVariablesDescription = {
  risk: 'Risk is the chance that something will go wrong. The higher the risk, the more likely it is that something will go wrong.',
  complexity:
    'Complexity is the amount of work that needs to be done. The higher the complexity, the more work there is to do.',
  unfamiliar:
    'Unfamiliarity is how well you know the work. The less familiar you are with the work, the more likely it is that something will go wrong.',
}

const formSchema = z.object({
  risk: z.string(),
  complexity: z.string(),
  unfamiliar: z.string(),
})

export type FormDeckProps = z.infer<typeof formSchema>

let defaultValues = {
  risk: '',
  complexity: '',
  unfamiliar: '',
}

export const Deck = ({ deck }: { deck: DeckValue }) => {
  const form = useForm<FormDeckProps>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = (data: FormDeckProps) => {
    console.log('Submit:', data)
    // onPick('1', DECK_NAME)
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <div>
        <PickedCard control={form.control} deck={deck} />
      </div>

      <Form {...form}>
        <form
          className="grid grid-cols-3 place-items-center gap-9 md:grid-cols-1"
          onSubmit={form.handleSubmit(onSubmit)}
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
                  <FormLabel className="capitalize">{PART_OF_VALUE}</FormLabel>
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

          <div className="col-span-3 md:col-span-full">
            <Button
              type="reset"
              onClick={() => form.reset(defaultValues)}
              variant="outline"
              className="w-40"
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
