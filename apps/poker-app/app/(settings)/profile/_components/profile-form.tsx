'use client'

import { useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
  toast,
} from '@easypoker/ui'

import { profileFormSchema, UserProfileValues } from '@/lib/user/user'
import { updateUserInfoAction } from '@/app/actions'

export function ProfileForm({
  defaultValues,
}: {
  defaultValues: UserProfileValues
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm<UserProfileValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
    resetOptions: {
      keepDirty: true,
    },
  })

  function onSubmit(data: UserProfileValues) {
    // if (!form.formState.isDirty) {
    //   toast({
    //     title: 'No changes',
    //     description: 'You have not made any changes to your profile.',
    //   })
    //   return
    // }
    startTransition(() => {
      updateUserInfoAction(data).then(() => {
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated.',
        })
      })
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending} className="w-40">
          {isPending ? (
            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            'Update profile'
          )}
        </Button>
      </form>
    </Form>
  )
}
