import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()
export { redis }

const ALL_CHECKS = 'all-checks'

export async function getAllChecks(): Promise<string | null> {
  return redis.get(ALL_CHECKS)
}

export async function addToAllChecks() {
  const count = getAllChecks()
  await redis.set(ALL_CHECKS, count ? Number(count) + 1 : 1)
  return redis.get(ALL_CHECKS)
}
