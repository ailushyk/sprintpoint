export const AUTH_SIGN_IN_URL = '/sign-in'
export const AUTH_DEFAULT_REDIRECT_URL = '/dashboard'
export const publicRoutes: string[] = ['/']

/**
 * An array of routes that are used for authentication.
 * That routes will be redirect logged users to the /dashboard
 * @type {string[]}
 */
export const authRoutes: string[] = [AUTH_SIGN_IN_URL, '/auth/error']

/**
 * The prefix for the API authentication routes.
 * Routes that start with this prefix are used for authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'
export const closedRoutes: string[] = [
  `${apiAuthPrefix}/signin`,
  `${apiAuthPrefix}/error`,
]
