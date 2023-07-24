import React from 'react'

export const WaitOnPromise = async ({
  promise,
  children,
}: {
  promise: Promise<{ data: unknown }>
  children: (props: { data: unknown }) => React.ReactNode
}) => {
  const { data } = await promise
  return <>{children({ data })}</>
}
