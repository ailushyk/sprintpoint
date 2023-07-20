import { Icons } from '@easypoker/ui'

export default function RoomLoadingPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="flex gap-1 items-center text-muted-foreground">
        Loading <Icons.spinner className="h-4 w-4 animate-spin" />
      </div>
    </div>
  )
}
