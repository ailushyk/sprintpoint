'use client'

import { Button } from '@/components/ui/button'
import { Icon } from '@/components/ui/Icon'
import { useClipboard } from '@/lib/use-clipboard'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

export type Props = {
  id: string
  name: string
  className?: string
}

const makeUrl = (code: string) => `${window.location.origin}/s/${code}`

export const RoomTitle = ({ className, ...props }: Props) => {
  const { isPending, copy } = useClipboard()

  const handleClipboardCopy = async (value: string) => {
    await copy(value, `The link URL has been copied to the clipboard!`)
  }

  return (
    <div
      className={cn(
        'relative flex items-center gap-2 text-muted-foreground',
        className,
      )}
    >
      <h1 className="col-span-2 row-[1/2] text-base">{props.name}</h1>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-10 row-[2/3] disabled:opacity-100 max-sm:hidden"
        onClick={() => handleClipboardCopy(makeUrl(props.id))}
        disabled={isPending}
      >
        <AnimatePresence mode="popLayout">
          {isPending ? (
            <motion.div
              key="clipboard-check"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Icon.clipboardCheck className="h-4 w-4 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="clipboard-copy"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <Icon.clipboardCopy className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  )
}
