import { AppHeader } from '@/components/app-header/app-header'
import { SignIn } from '@/components/auth/sign-in'
import { GradientText } from '@/components/gradient-text'
import { Button } from '@/components/ui/button'

export default function SignInPage({
  searchParams,
}: {
  searchParams: {
    redirect?: string
  }
}) {
  return (
    <div>
      <AppHeader />

      <div className="container space-y-8 p-8 text-center">
        <h1 className="text-4xl font-bold">
          <GradientText>You are unauthenticated</GradientText>
        </h1>
        <p>Please sign in before continuing</p>

        <SignIn redirectTo={searchParams.redirect} asChild>
          <Button size="lg" className="w-32">
            Sign In
          </Button>
        </SignIn>
      </div>
    </div>
  )
}
