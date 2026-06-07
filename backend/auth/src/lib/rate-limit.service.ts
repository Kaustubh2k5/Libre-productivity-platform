import { RateLimitRepository } from "../repositories/rate-limit.repository.js";

const MAX_SIGNUP_ATTEMPTS = Number(process.env.MAX_SIGNUP_ATTEMPTS);
const MAX_LOGIN_ATTEMPTS = Number(process.env.MAX_LOGIN_ATTEMPTS || 5);
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

  /**
   * Check login email rate limit (checks if user is locked)
   */
  static async checkLoginLimit(email: string) {
    const locked = await RateLimitRepository.isLocked(email);

    if (locked) {
      throw new Error("Too many attempts. Try again later.");
    }
  }

  /**
   * Handle failed login attempt (increments attempts, applies lock if exceeded)
   */
  static async handleFailedLogin(email: string) {
    const attempts = await RateLimitRepository.incrementLoginEmailAttempts(
      email,
      LOCK_TIME_SECONDS
    );

    if (attempts >= MAX_LOGIN_ATTEMPTS) {
      await RateLimitRepository.lockIdentifier(email, LOCK_TIME_SECONDS);
      throw new Error("Too many login attempts. Try again later.");
    }
  }

  /**
   * Handle successful login (clears attempts and lock)
   */
  static async handleSuccessfulLogin(email: string) {
    await RateLimitRepository.clearLoginAttempts(email);
    await RateLimitRepository.clearLock(email);
  }
}

