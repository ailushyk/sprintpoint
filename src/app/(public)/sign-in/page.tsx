import { SignIn } from '@/components/auth/sign-in'
import { GradientText } from '@/components/gradient-text'
import { TopBar } from '@/components/top-bar/top-bar'
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
      <TopBar />

      <div className="container space-y-8 p-8 text-center">
        <h1 className="text-4xl font-bold">
          <GradientText>You are unauthenticated</GradientText>
        </h1>
        <p>Please sign in before continuing</p>

        <Button asChild size="lg" className="w-32">
          <SignIn redirectTo={searchParams.redirect}>Sign In</SignIn>
        </Button>
      </div>
    </div>
  )
}
