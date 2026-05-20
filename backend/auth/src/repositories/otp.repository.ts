// src/repositories/otp.repository.ts

import { redis } from "../lib/redis.js";

const OTP_PREFIX = "signup:otp:";
const OTP_ATTEMPT_PREFIX = "signup:otp:attempts:";

interface OtpPayload {
  otpHash: string;
  email: string;
  passwordHash: string;
  clientId: string;
}

export class OtpRepository {
  /**
   * Store OTP payload with expiry
   */
  static async storeOtp(
    email: string,
    payload: OtpPayload,
    ttlSeconds: number
  ): Promise<void> {
    const key = OTP_PREFIX + email;

    await redis.set(
      key,
      JSON.stringify(payload),
      "EX",
      ttlSeconds
    );
  }

  /**
   * Retrieve OTP payload
   */
  static async getOtp(
    email: string
  ): Promise<OtpPayload | null> {
    const key = OTP_PREFIX + email;

    const data = await redis.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as OtpPayload;
  }

  /**
   * Delete OTP after successful verification
   */
  static async deleteOtp(email: string): Promise<void> {
    const key = OTP_PREFIX + email;

    await redis.del(key);
  }

  /**
   * Check remaining OTP TTL
   */
  static async getOtpTTL(email: string): Promise<number> {
    const key = OTP_PREFIX + email;

    return redis.ttl(key);
  }

  /**
   * Increment OTP verification attempts
   */
  static async incrementOtpAttempts(
    email: string,
    ttlSeconds = 300
  ): Promise<number> {
    const key = OTP_ATTEMPT_PREFIX + email;

    const attempts = await redis.incr(key);

    // set expiry only on first creation
    if (attempts === 1) {
      await redis.expire(key, ttlSeconds);
    }

    return attempts;
  }

  /**
   * Get current OTP verification attempts
   */
  static async getOtpAttempts(
    email: string
  ): Promise<number> {
    const key = OTP_ATTEMPT_PREFIX + email;

    const attempts = await redis.get(key);

    return attempts ? Number(attempts) : 0;
  }

  /**
   * Clear OTP verification attempts
   */
  static async clearOtpAttempts(
    email: string
  ): Promise<void> {
    const key = OTP_ATTEMPT_PREFIX + email;

    await redis.del(key);
  }
}