'use client'

import React from 'react'
import * as RadixDialog from '@radix-ui/react-dialog'

import { cn } from '../../lib/utils'

const Drawer = RadixDialog.Root

const DrawerTrigger = RadixDialog.Trigger
DrawerTrigger.displayName = 'DrawerTrigger'

const DrawerPortal = RadixDialog.Portal
DrawerPortal.displayName = 'DrawerPortal'

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof RadixDialog.Overlay>,
  React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>
>(({ children, className, ...props }, ref) => {
  return (
    <RadixDialog.Overlay
      ref={ref}
      className={cn(
        'fixed inset-0 z-50 bg-secondary-foreground/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-background/70',
        className
      )}
      {...props}
    >
      {children}
    </RadixDialog.Overlay>
  )
})
DrawerOverlay.displayName = 'DrawerOverlay'

const DrawerContent = RadixDialog.Content
DrawerContent.displayName = 'DrawerContent'

const DrawerTitle = RadixDialog.Title
DrawerTitle.displayName = 'DrawerTitle'

const DrawerDescription = RadixDialog.Description
DrawerDescription.displayName = 'DrawerDescription'

const DrawerClose = RadixDialog.Close
DrawerClose.displayName = 'DrawerClose'

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
