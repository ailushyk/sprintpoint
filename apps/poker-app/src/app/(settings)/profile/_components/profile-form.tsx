'use client'

import React from 'react'
import { useFormState } from 'react-dom'

import { UserProfileValues } from '@/lib/api/api-types'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormSubmit,
} from '@/components/form'
import { updateUserProfileAction } from '@/app/actions'

/**
 * find first error by name
 */
export function getFormErrorByName(
  name: string,
  errors: { issues: Array<any> }
): { message: string } | null {
  if (!errors) return null
  return errors.issues.find((e) => e.path.join('.') === name)
}

export function ProfileForm({ user }: { user: UserProfileValues }) {
  const [state, formAction] = useFormState(updateUserProfileAction, user)
  let errors: any = null
  if (state.errors) {
    errors = JSON.parse(state.errors)
  }

  return (
    <Form action={formAction}>
      {/*<FormField name="email">*/}
      {/*  <FormLabel>Email</FormLabel>*/}
      {/*  <FormControl asChild>*/}
      {/*    <Input defaultValue={user.email || ''} />*/}
      {/*  </FormControl>*/}
      {/*  {getErrors('email', errors) && (*/}
      {/*    <FormMessage>{getErrors('email', errors)?.message}</FormMessage>*/}
      {/*  )}*/}
      {/*  <FormDescription>*/}
      {/*    The username is used to identify you in the room.*/}
      {/*  </FormDescription>*/}
      {/*</FormField>*/}

      <FormField name="username">
        <FormLabel>Username</FormLabel>
        <FormControl asChild>
          <Input defaultValue={user.username || ''} />
        </FormControl>
        {getFormErrorByName('username', errors) && (
          <FormMessage>
            {getFormErrorByName('username', errors)?.message}
          </FormMessage>
        )}
        <FormDescription>
          This is your public display name. It can be your real name or a
          pseudonym.
        </FormDescription>
      </FormField>

      <div className="flex justify-end">
        <FormSubmit asChild>Update profile</FormSubmit>
      </div>
    </Form>
  )
}
