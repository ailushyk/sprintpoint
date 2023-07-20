import React from 'react'

export const DotsSkeleton = () => {
  return (
    <div className="flex animate-pulse gap-1">
      <div className="bg-accent dot dot-1 h-2 w-2 rounded-full" />
      <div className="bg-accent dot dot-2 h-2 w-2 rounded-full" />
      <div className="bg-accent dot dot-3 h-2 w-2 rounded-full" />
    </div>
  )
}
