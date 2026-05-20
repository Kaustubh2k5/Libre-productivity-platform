// src/repositories/rate-limit.repository.ts

import { redis } from "../lib/redis.js";

const SIGNUP_EMAIL_PREFIX = "signup:attempts:email:";
const SIGNUP_IP_PREFIX = "signup:attempts:ip:";

const LOGIN_EMAIL_PREFIX = "login:attempts:email:";
const LOGIN_IP_PREFIX = "login:attempts:ip:";

const LOCK_PREFIX = "auth:lock:";

export class RateLimitRepository {
  /**
   * Increment signup attempts by email
   */
  static async incrementSignupEmailAttempts(
    email: string,
    ttlSeconds = 900,
  ): Promise<number> {
    const key = SIGNUP_EMAIL_PREFIX + email;

    const attempts = await redis.incr(key);

    if (attempts === 1) {
      await redis.expire(key, ttlSeconds);
    }

    return attempts;
  }

  /**
   * Increment signup attempts by IP
   */
  static async incrementSignupIpAttempts(
    ip: string,
    ttlSeconds = 900,
  ): Promise<number> {
    const key = SIGNUP_IP_PREFIX + ip;

    const attempts = await redis.incr(key);

    if (attempts === 1) {
      await redis.expire(key, ttlSeconds);
    }

    return attempts;
  }

  /**
   * Increment login attempts by email
   */
  static async incrementLoginEmailAttempts(
    email: string,
    ttlSeconds = 900,
  ): Promise<number> {
    const key = LOGIN_EMAIL_PREFIX + email;

    const attempts = await redis.incr(key);

    if (attempts === 1) {
      await redis.expire(key, ttlSeconds);
    }

    return attempts;
  }

  /**
   * Increment login attempts by IP
   */
  static async incrementLoginIpAttempts(
    ip: string,
    ttlSeconds = 900,
  ): Promise<number> {
    const key = LOGIN_IP_PREFIX + ip;

    const attempts = await redis.incr(key);

    if (attempts === 1) {
      await redis.expire(key, ttlSeconds);
    }

    return attempts;
  }

  /**
   * Get signup attempts by email
   */
  static async getSignupEmailAttempts(email: string): Promise<number> {
    const key = SIGNUP_EMAIL_PREFIX + email;

    const attempts = await redis.get(key);

    return attempts ? Number(attempts) : 0;
  }

  /**
   * Get signup attempts by IP
   */
  static async getSignupIpAttempts(ip: string): Promise<number> {
    const key = SIGNUP_IP_PREFIX + ip;

    const attempts = await redis.get(key);

    return attempts ? Number(attempts) : 0;
  }

  /**
   * Lock an identifier (email/ip)
   */
  static async lockIdentifier(
    identifier: string,
    ttlSeconds = 900,
  ): Promise<void> {
    const key = LOCK_PREFIX + identifier;

    await redis.set(key, "locked", "EX", ttlSeconds);
  }

  /**
   * Check if identifier is locked
   */
  static async isLocked(identifier: string): Promise<boolean> {
    const key = LOCK_PREFIX + identifier;

    const exists = await redis.exists(key);

    return exists === 1;
  }

  /**
   * Remove lock manually
   */
  static async clearLock(identifier: string): Promise<void> {
    const key = LOCK_PREFIX + identifier;

    await redis.del(key);
  }

  /**
   * Clear signup attempts
   */
  static async clearSignupAttempts(email: string): Promise<void> {
    const emailKey = SIGNUP_EMAIL_PREFIX + email;

    await redis.del(emailKey);
  }

  /**
   * Clear login attempts
   */
  static async clearLoginAttempts(email: string): Promise<void> {
    const emailKey = LOGIN_EMAIL_PREFIX + email;

    await redis.del(emailKey);
  }
}
