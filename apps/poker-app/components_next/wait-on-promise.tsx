import React, { Suspense } from 'react'

export const WaitOnPromise = async ({
  promise,
  children,
  fallback,
}: {
  promise: Promise<{ data: unknown }>
  children: (props: { data: unknown }) => React.ReactNode
  fallback?: React.ReactNode
}) => {
  const { data } = await promise
  return <Suspense fallback={fallback}>{children({ data })}</Suspense>
}
