import { FadeInPageWrapper } from '@/components/fade-in-page-wrapper'
import { Icon } from '@/components/ui/Icon'

export const LoadingPage = () => {
  return (
    <FadeInPageWrapper
      duration="mid"
      className="grid h-screen place-content-center items-center"
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        Loading <Icon.spinner className="h-5 w-5 animate-spin" />
      </div>
    </FadeInPageWrapper>
  )
}
