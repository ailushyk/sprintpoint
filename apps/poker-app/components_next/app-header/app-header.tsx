import Link from 'next/link'
import { UserNav } from '@/components_next/app-header/user-nav'

import { buttonVariants, cn } from '@easypoker/ui'

export function AppHeader({
  links,
}: {
  links?: { href: string; label: string }[]
}) {
  return (
    <header className="supports-backdrop-blur:bg-background/60 w-full border-b bg-background/95 backdrop-blur">
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
