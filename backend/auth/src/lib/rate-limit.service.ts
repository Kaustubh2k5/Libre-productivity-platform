import { RateLimitRepository } from "../repositories/rate-limit.repository.js";

const MAX_SIGNUP_ATTEMPTS = Number(process.env.MAX_SIGNUP_ATTEMPTS);
const LOCK_TIME_SECONDS = Number(process.env.LOCK_TIME_SECONDS);

export class RateLimitService {
  /**
   * Check signup email rate limit
   */
  static async checkSignupEmailLimit(email: string) {
    /**
     * Existing lock?
     */
    const locked = await RateLimitRepository.isLocked(email);

    if (locked) {
      throw new Error("Too many attempts. Try again later.");
    }

    /**
     * Increment attempts
     */
    const attempts =
      await RateLimitRepository.incrementSignupEmailAttempts(email);

    /**
     * Apply lock
     */
    if (attempts >= MAX_SIGNUP_ATTEMPTS) {
      await RateLimitRepository.lockIdentifier(email, LOCK_TIME_SECONDS);

      throw new Error("Too many signup attempts");
    }
  }

  /**
   * Reset signup rate limit
   */
  static async clearSignupLimit(email: string) {
    await RateLimitRepository.clearSignupAttempts(email);

    await RateLimitRepository.clearLock(email);
  }
}
