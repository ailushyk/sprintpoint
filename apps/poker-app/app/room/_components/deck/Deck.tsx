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

const DECK_NAME = 'standard'
const estimateParams = ['risk', 'complexity', 'unfamiliar'] as const

const formSchema = z.object({
  risk: z.string(),
  complexity: z.string(),
  unfamiliar: z.string(),
})

type FormProps = z.infer<typeof formSchema>

export const Deck = () => {
  const { data } = api().deck.get(DECK_NAME)
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      risk: '',
      complexity: '',
      unfamiliar: '',
    },
  })

  const onSubmit = (data: FormProps) => {
    console.log(data)
    // onPick('1', DECK_NAME)
  }

  return (
    <div className="flex flex-col items-center">
      <div>
        <div>Vote</div>
        <div>?</div>
      </div>
      <Form {...form}>
        <form
          className="grid grid-cols-3 place-items-center md:grid-cols-1 md:gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Button type="submit">confirm</Button>

          {estimateParams.map((PART_OF_VALUE) => (
            <section
              key={PART_OF_VALUE}
              className="flex flex-col items-center gap-1 md:items-start"
            >
              <FormField
                control={form.control}
                name={PART_OF_VALUE}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{PART_OF_VALUE}</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col gap-3 md:flex-row"
                      >
                        {data.cards.map((card) => (
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
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
          ))}
        </form>
      </Form>
    </div>
  )
}
