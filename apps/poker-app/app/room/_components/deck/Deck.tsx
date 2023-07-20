'use client'

import React from 'react'
import { api } from '@/api/api'
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  RadioGroup,
  RadioGroupItem,
} from '@easypoker/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { PickedCard } from '@/app/room/_components/deck/PickedCard'

const DECK_NAME = 'standard'
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

export const Deck = () => {
  const deck = api().deck.getAdvanced(DECK_NAME)
  const [pickedCard, setPickedCard] = React.useState<string>('')
  const form = useForm<FormDeckProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      risk: '',
      complexity: '',
      unfamiliar: '',
    },
  })

  const onSubmit = (data: FormDeckProps) => {
    // console.log(data)
    // onPick('1', DECK_NAME)
  }

  const onChange = (value, { name, type }) => {
    // console.log(value, name, type)
  }

  React.useEffect(
    () => {
      const subscription = form.watch(onChange)
      return () => subscription.unsubscribe()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.watch]
  )

  return (
    <div className="flex flex-col items-center">
      <div>
        <div>Vote</div>
        <PickedCard control={form.control} deck={deck.data} />
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-3 place-items-center gap-3 md:grid-cols-1 md:gap-9"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="col-span-3 md:col-span-full">
            <Button type="submit">confirm</Button>
          </div>

          {estimateParams.map((PART_OF_VALUE) => (
            <FormField
              key={PART_OF_VALUE}
              control={form.control}
              name={PART_OF_VALUE}
              render={({ field }) => (
                <FormItem className="flex flex-col items-center justify-center md:items-start">
                  <FormLabel className="capitalize">{PART_OF_VALUE}</FormLabel>
                  <FormDescription className="hidden md:block md:max-w-xl">
                    {planingPokerVariablesDescription[PART_OF_VALUE]}
                  </FormDescription>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col gap-3 md:flex-row"
                    >
                      {deck.data.cards.map((card) => (
                        <FormItem key={`${PART_OF_VALUE}-${card.name}`}>
                          <FormLabel className="border-muted bg-popover hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary flex h-14 w-14 cursor-pointer flex-col items-center justify-center rounded-md border-2 p-4 text-xl">
                            <FormControl>
                              <RadioGroupItem
                                value={card.name}
                                className="sr-only"
                              />
                            </FormControl>
                            {card.name}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
    </div>
  )
}
