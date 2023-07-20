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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@easypoker/ui'

import { createRoomAction } from '@/app/(home)/_components/create-room-actions'

const createRoomFormSchema = z.object({
  name: z.string().nonempty(),
  deck: z.string().nonempty(),
})

export type CreateRoomFormValues = z.infer<typeof createRoomFormSchema>

const defaultValues = {
  name: '',
  deck: 'standard',
}

export const CreateRoomForm = () => {
  let [isPending, startTransition] = useTransition()
  const form = useForm<CreateRoomFormValues>({
    resolver: zodResolver(createRoomFormSchema),
    defaultValues,
  })

  const onSubmit = (data: CreateRoomFormValues) => {
    startTransition(async () => {
      try {
        await createRoomAction(data)

        form.reset()
        toast({
          title: 'Room created!',
          description: 'You can now share the link with your friends.',
        })
      } catch (e) {
        toast({
          title: 'Ups!',
          description: 'Something went wrong. Please try again later.',
        })
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Room&apos;s name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                The name of the room is used to identify it. It can be anything
                you want.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="deck"
          control={form.control}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Deck</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select deck" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  {/*<SelectItem value="fibonacci">Fibonacci</SelectItem>*/}
                  {/*<SelectItem value="tshirt">T-Shirt</SelectItem>*/}
                </SelectContent>
              </Select>
              <FormDescription>
                <p>
                  The deck is a set of cards that you will use to estimate the
                  complexity of the tasks.
                </p>
                <p>Coming soon: custom decks and deck&apos;s settings.</p>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-right">
          <Button type="submit" className="w-40">
            {isPending ? (
              <span className="text-muted flex items-center">
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                <span>Creating...</span>
              </span>
            ) : (
              'Create'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
