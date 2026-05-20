import { redis } from "../lib/redis.js";

const SESSION_PREFIX = "session:refresh:";

const REVOKED_PREFIX = "session:revoked:";

export interface CachedSessionPayload {
  sessionId: string;

  userId: string;

  revoked: boolean;

  expiresAt: string;
}

export class SessionCacheRepository {
  /**
   * Cache refresh session
   */
  static async cacheSession(
    tokenHash: string,
    payload: CachedSessionPayload,
    ttlSeconds: number,
  ): Promise<void> {
    const key = SESSION_PREFIX + tokenHash;

    await redis.set(key, JSON.stringify(payload), "EX", ttlSeconds);
  }

  /**
   * Retrieve cached refresh session
   */
  static async getCachedSession(
    tokenHash: string,
  ): Promise<CachedSessionPayload | null> {
    const key = SESSION_PREFIX + tokenHash;

    const data = await redis.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as CachedSessionPayload;
  }

  /**
   * Delete cached session
   */
  static async deleteCachedSession(tokenHash: string): Promise<void> {
    const key = SESSION_PREFIX + tokenHash;

    await redis.del(key);
  }

  /**
   * Mark session revoked
   */
  static async revokeSession(
    sessionId: string,
    ttlSeconds: number,
  ): Promise<void> {
    const key = REVOKED_PREFIX + sessionId;

    await redis.set(key, "revoked", "EX", ttlSeconds);
  }

  /**
   * Check if session revoked
   */
  static async isSessionRevoked(sessionId: string): Promise<boolean> {
    const key = REVOKED_PREFIX + sessionId;

    const exists = await redis.exists(key);

    return exists === 1;
  }

  /**
   * Get session TTL
   */
  static async getSessionTTL(tokenHash: string): Promise<number> {
    const key = SESSION_PREFIX + tokenHash;

    return redis.ttl(key);
  }

  /**
   * Extend session expiry
   */
  static async extendSession(
    tokenHash: string,
    ttlSeconds: number,
  ): Promise<void> {
    const key = SESSION_PREFIX + tokenHash;

    await redis.expire(key, ttlSeconds);
  }
}
