import { auth } from '@/lib/auth/auth'
import {
  apiAuthPrefix,
  AUTH_DEFAULT_REDIRECT_URL,
  AUTH_SIGN_IN_URL,
  authRoutes,
  closedRoutes,
  publicRoutes,
} from '@/routes'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const isClosedRoutes = closedRoutes.includes(nextUrl.pathname)
  const isApiAuthRoutes = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
  if (isClosedRoutes) {
    return Response.redirect(new URL(AUTH_DEFAULT_REDIRECT_URL, nextUrl))
  }
  if (isApiAuthRoutes) {
    return
  }
  if (isAuthRoutes) {
    if (isLoggedIn) {
      return Response.redirect(new URL(AUTH_DEFAULT_REDIRECT_URL, nextUrl))
    }
    return
  }
  if (!isLoggedIn && !isPublicRoutes) {
    const url = new URL(AUTH_SIGN_IN_URL, nextUrl)
    url.searchParams.set('redirect', nextUrl.pathname)
    return Response.redirect(url)
  }
  return
})

export const config = {
  matcher: [
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
  ],
}
