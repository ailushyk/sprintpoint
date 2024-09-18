import { ReactNode } from 'react'

export function PageHeader({ children }: { children: ReactNode }) {
  return (
    <header className="py-8">
      <h1 className="text-4xl font-bold">{children}</h1>
    </header>
  )
}