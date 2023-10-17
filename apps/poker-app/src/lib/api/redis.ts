import { notFound } from 'next/navigation'
import { Redis } from '@upstash/redis'

import { Room, roomSchema } from '@easypoker/shared/src/refactor-types'

const redis = Redis.fromEnv()
export { redis }

const ALL_CHECKS = 'all-checks'

export async function getAllChecks(): Promise<string | null> {
  return redis.get(ALL_CHECKS)
}

export async function addToAllChecks() {
  const count = await getAllChecks()
  await redis.set(ALL_CHECKS, count ? Number(count) + 1 : 1)
  return redis.get(ALL_CHECKS)
}

// create a new room
export async function createRoom(room: Room) {
  await redis.hset(room.code, room)
}

// TODO: check if call to redis is correct and not multiple calls
export async function getRoom(hash: string): Promise<Room> {
  const room = await redis.hgetall(hash)
  if (!room) notFound()
  return roomSchema.parse(room)
}
