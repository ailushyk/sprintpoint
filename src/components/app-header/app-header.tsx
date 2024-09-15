import Link from 'next/link'

import { UserNav } from '@/components/app-header/user-nav'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function AppHeader({
  links,
}: {
  links?: { href: string; label: string }[]
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div>
          <Link href="/" className="font-bold text-muted-foreground">
            Sprint Point
          </Link>
        </div>
        <div className="flex items-center space-x-3">
          {links?.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(buttonVariants({ variant: 'outline', size: 'sm' }))}
            >
              {link.label}
            </Link>
          ))}
          <UserNav />
        </div>
      </div>
    </header>
  )
}
