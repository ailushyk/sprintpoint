import Link from 'next/link'
import { UserNav } from '@/components_next/app-header/user-nav'

export function AppHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center justify-between">
        <div>
          <Link href="/" className="font-bold text-muted-foreground">
            Sprint Point
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          <UserNav />
        </div>
      </div>
    </header>
  )
}
