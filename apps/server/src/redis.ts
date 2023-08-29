import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://eu1-proper-dassie-38877.upstash.io',
  token:
    'AZfdASQgYzgyNThkZmMtMDgwYi00NDViLWIxNjctODc5YmY1MGUwMmZlMTU3ZWJkYWNkZDg0NGI3MDlhMzg5NjBmMDMxZGFiMDc=',
})

const ALL_CHECKS = 'all-checks'

export async function getAllChecks(): Promise<string | null> {
  return redis.get(ALL_CHECKS)
}

export async function addToAllChecks() {
  const count = await getAllChecks()
  if (process.env.ENABLE_INCREMENTING_TOTAL === 'true') {
    await redis.set(ALL_CHECKS, count ? Number(count) + 1 : 1)
  } else {
    console.log('skipping redis')
  }
  return redis.get(ALL_CHECKS)
}
