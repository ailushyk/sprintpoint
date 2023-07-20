export const RoomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen flex-col items-center gap-8">
      {children}
    </div>
  )
}
