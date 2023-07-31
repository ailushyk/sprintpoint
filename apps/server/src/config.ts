import * as dotenv from 'dotenv'

dotenv.config()

const CORS_ORIGIN = process.env.CORS_ORIGIN
const APP_PORT = process.env.APP_PORT

export { CORS_ORIGIN, APP_PORT }
