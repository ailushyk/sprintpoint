export default function Layout({
  children,
  verify,
}: {
  children: React.ReactNode
  verify: React.ReactNode
}) {
  return (
    <>
      {children}
      {verify}
    </>
  )
}
