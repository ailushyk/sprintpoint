'use client'

import { useTransition } from 'react'
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
  Icons,
  Input,
} from '@easypoker/ui'

import { joinRoom } from '@/app/actions'

const joinRoomFormSchema = z.object({
  code: z.string().min(8).max(8),
})

export type JoinRoomFormValues = z.infer<typeof joinRoomFormSchema>

const defaultValues: JoinRoomFormValues = {
  code: '',
}

export const JoinRoomForm = () => {
  let [isPending, startTransition] = useTransition()
  const form = useForm<JoinRoomFormValues>({
    resolver: zodResolver(joinRoomFormSchema),
    defaultValues,
  })

  const onSubmit = (data: JoinRoomFormValues) => {
    startTransition(() => {
      joinRoom(data.code)
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="code"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Room&apos;s code</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The code is 8 characters long and is case sensitive.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit" className="w-40">
            {isPending && <Icons.spinner className="h-4 w-4 animate-spin" />}
            Join
          </Button>
        </div>
      </form>
    </Form>
  )
}
