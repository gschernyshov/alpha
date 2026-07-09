import { createClient } from 'redis'

const redis = createClient({
  url: process.env.REDIS_URL,
})

redis.on('error', error => console.error('Redis Client Error: ', error))
redis.on('connect', () => console.log('Connected to Redis'))

if (typeof window === 'undefined') {
  redis.connect().catch(e => {
    console.error('Redis connection failed: ', e)
  })
}

export { redis }
