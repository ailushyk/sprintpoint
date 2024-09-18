import { env } from '@/env'
import { getAccessToken } from '@/lib/auth/user.server'

const AUTHORIZATION_HEADER = 'Authorization'
const BEARER_PREFIX = 'Bearer'
const ERROR_MESSAGE = 'An error occurred while fetching the data.'

const createHeaders = async (initHeaders?: HeadersInit): Promise<Headers> => {
  const token = await getAccessToken()
  const headers = new Headers(initHeaders)
  if (headers.get('Content-Type') === null) {
    headers.append('Content-Type', 'application/json')
  }
  if (token) {
    headers.append(AUTHORIZATION_HEADER, `${BEARER_PREFIX} ${token}`)
  }
  return headers
}

const handleResponse = async <T>(response: Response): Promise<{ data: T }> => {
  if (!response.ok) {
    console.error(response.status, response.statusText)
    throw new Error(ERROR_MESSAGE)
  }
  if (response.status === 204) {
    return { data: undefined as unknown as T }
  }

  return response.json()
}

export const fetcher = async <T = unknown>(
  url: string,
  init?: RequestInit,
): Promise<{ data: T }> => {
  console.log('fetcher', url)
  const headers = await createHeaders(init?.headers)
  if (!(url.startsWith('http') || url.startsWith('//'))) {
    url = `${env.API_URL}${url}`
  }
  const response = await fetch(url, {
    ...init,
    headers,
  })
  return handleResponse<T>(response)
}
