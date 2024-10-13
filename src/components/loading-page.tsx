import { Icon } from '@/components/ui/Icon'
import { PageWrapper } from '@/components/page-wrapper'

export const LoadingPage = () => {
  return (
    <PageWrapper
      duration="mid"
      className="grid h-screen place-content-center items-center"
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        Loading <Icon.spinner className="h-5 w-5 animate-spin" />
      </div>
    </PageWrapper>
  )
}
