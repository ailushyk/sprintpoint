'use client'

import React, { forwardRef } from 'react'
import * as RadixForm from '@radix-ui/react-form'

import { cn } from '@/lib/utils'
import { SubmitButton } from '@/components/submit-button'

const Form = forwardRef<
  React.ElementRef<typeof RadixForm.Root>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadixForm.Root
      ref={ref}
      className={cn('flex flex-col gap-6', className)}
      {...props}
    />
  )
})
Form.displayName = 'Form'

const FormField = forwardRef<
  React.ElementRef<typeof RadixForm.Field>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Field>
>(({ className, ...props }, ref) => {
  return (
    <RadixForm.Field
      ref={ref}
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
})
FormField.displayName = 'FormField'

const FormLabel = forwardRef<
  React.ElementRef<typeof RadixForm.Label>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Label>
>(({ className, ...props }, ref) => {
  return (
    <RadixForm.Label
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
})
FormLabel.displayName = 'FormLabel'

const FormControl = RadixForm.Control
const FormMessage = RadixForm.Message
const FormSubmit = forwardRef<
  React.ElementRef<typeof RadixForm.Submit>,
  React.ComponentPropsWithoutRef<typeof RadixForm.Submit>
>(({ className, children, ...props }, ref) => {
  return (
    <RadixForm.Submit asChild className={cn('', className)}>
      <SubmitButton>{children}</SubmitButton>
    </RadixForm.Submit>
  )
})
FormSubmit.displayName = 'FormSubmit'

export { Form, FormField, FormLabel, FormControl, FormMessage, FormSubmit }
