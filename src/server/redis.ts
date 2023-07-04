import { Redis } from "@upstash/redis";

import { env } from "@/env.mjs";

const globalForRedis = globalThis as unknown as { redis: Redis };

export const redis = globalForRedis.redis || Redis.fromEnv();

if (env.NODE_ENV !== "production") globalForRedis.redis = redis;