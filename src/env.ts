import 'server-only'

const API_URL = process.env.API_URL || 'http://localhost:3000'
const AUTH_KEYCLOAK_ID = process.env.AUTH_KEYCLOAK_ID
const AUTH_KEYCLOAK_ISSUER = process.env.AUTH_KEYCLOAK_ISSUER
const AUTH_KEYCLOAK_SECRET = process.env.AUTH_KEYCLOAK_SECRET
const RESEND_API_KEY = process.env.RESEND_API_KEY || ''

export const env = {
  API_URL,
  AUTH_KEYCLOAK_ID,
  AUTH_KEYCLOAK_ISSUER,
  AUTH_KEYCLOAK_SECRET,
  RESEND_API_KEY,
}
