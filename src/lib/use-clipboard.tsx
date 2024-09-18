import { toast } from '@/components/ui/toast/use-toast'
import { useEffect, useState, useTransition } from 'react'

export function useClipboard() {
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleCopy = async (value: string, message?: string) => {
    const _message = message || 'Value successfully copied to clipboard'
    startTransition(() => {
      try {
        navigator.clipboard.writeText(value).then(() => {})
        setCopied(true)
        toast({
          title: 'Copied to clipboard',
          description: _message,
        })
      } catch (error) {
        console.error(error)
        toast({
          title: 'Error',
          description: 'Could not copy room code to clipboard',
        })
      }
    })
  }

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [copied])

  return {
    isPending: isPending || copied,
    copy: handleCopy,
  }
}
