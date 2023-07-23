import React from 'react'

export const DotsSkeleton = () => {
  return (
    <div className="flex animate-pulse gap-1">
      <div className="dot dot-1 h-2 w-2 rounded-full bg-accent" />
      <div className="dot dot-2 h-2 w-2 rounded-full bg-accent" />
      <div className="dot dot-3 h-2 w-2 rounded-full bg-accent" />
    </div>
  )
}
