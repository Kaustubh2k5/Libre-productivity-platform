import "dotenv/config";

import { Redis } from "ioredis";

/**
 * =========================================
 * Environment Validation
 * =========================================
 */

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;

if (!REDIS_HOST) {
  throw new Error("Missing REDIS_HOST environment variable");
}

if (!REDIS_PORT) {
  throw new Error("Missing REDIS_PORT environment variable");
}

const parsedRedisPort = Number(REDIS_PORT);

if (Number.isNaN(parsedRedisPort)) {
  throw new Error("REDIS_PORT must be a valid number");
}

if (parsedRedisPort < 0 || parsedRedisPort > 65535) {
  throw new Error("REDIS_PORT must be between 0 and 65535");
}

/**
 * =========================================
 * Redis Singleton
 * =========================================
 */

export const redis = new Redis({
  host: REDIS_HOST,
  port: parsedRedisPort,

  retryStrategy(times: number) {
    const delay = Math.min(times * 50, 2000);

    console.log(`Redis reconnect attempt #${times}`);

    return delay;
  },
});

/**
 * =========================================
 * Connection Events
 * =========================================
 */

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("ready", () => {
  console.log("Redis ready");
});

redis.on("error", (err: Error) => {
  console.error("Redis error:", err);
});

redis.on("close", () => {
  console.log("Redis connection closed");
});

redis.on("reconnecting", () => {
  console.log("Redis reconnecting...");
});
