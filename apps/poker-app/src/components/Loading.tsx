import { Icons } from '@easypoker/ui'

export const Loading = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex items-center gap-1 text-muted-foreground">
        Loading <Icons.spinner className="h-4 w-4 animate-spin" />
      </div>
    </div>
  )
}
