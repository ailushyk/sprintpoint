import { Separator, Skeleton } from '@easypoker/ui'

export default function ProfileLoadingPage() {
  return (
    <div className="container">
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <Separator />

        <div className="space-y-10">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-2/4" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-2/4" />
          </div>
        </div>
      </div>
    </div>
  )
}
