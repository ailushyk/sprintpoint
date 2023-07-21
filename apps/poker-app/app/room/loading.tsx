import { Icons } from '@easypoker/ui'

export default function RoomLoadingPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="text-muted-foreground flex items-center gap-1">
        Loading <Icons.spinner className="h-4 w-4 animate-spin" />
      </div>
    </div>
  )
}
