import crypto from 'crypto'

export function generateAccessCode() {
  const timestamp = Date.now().toString()
  return crypto.createHash('SHA256').update(timestamp).digest('hex').slice(0, 8)
}
