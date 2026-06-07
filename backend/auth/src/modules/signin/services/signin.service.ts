import { UserRepository } from "../../../repositories/user.repository.js";
import { AppRepository } from "../../../repositories/app.repository.js";
import { MembershipRepository } from "../../../repositories/membership.repository.js";
import { RefreshSessionRepository } from "../../../repositories/refresh-session.repository.js";
import { SessionCacheRepository } from "../../../repositories/session-cache.repository.js";
import { comparePassword, hashToken } from "../../../lib/bcrypt.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../lib/tokens.js";
import { RateLimitService } from "../../../lib/rate-limit.service.js";

const userRepository = new UserRepository();
const appRepository = new AppRepository();
const membershipRepository = new MembershipRepository();
const refreshSessionRepository = new RefreshSessionRepository();

interface SigninInput {
  email: string;
  password: string;
  clientId: string;
}

export const signinService = async ({
  email,
  password,
  clientId,
}: SigninInput) => {
  /**
   * validate app
   */
  const app = await appRepository.findByClientId(clientId);

  if (!app) {
    throw new Error("Invalid client");
  }

  /**
   * find user by email
   */
  const user = await userRepository.findByEmail(email);

  if (!user) {
    await RateLimitService.handleFailedLogin(email);
    throw new Error("Invalid credentials");
  }

  /**
   * verify password
   */
  const passwordMatches = await comparePassword(password, user.passwordHash);

  if (!passwordMatches) {
    await RateLimitService.handleFailedLogin(email);
    throw new Error("Invalid credentials");
  }

  /**
   * check membership
   */
  const membership = await membershipRepository.findMembership(user.id, app.id);

  if (!membership) {
    throw new Error("Not a member of this application");
  }

  /**
   * clear rate limit
   */
  await RateLimitService.handleSuccessfulLogin(email);

  /**
   * generate tokens
   */
  const refreshToken = generateRefreshToken();
  const refreshTokenHash = hashToken(refreshToken);
  const refreshTokenTtl = Number(process.env.REFRESH_TOKEN_TTL);
  const expiresAt = new Date(Date.now() + refreshTokenTtl * 1000);

  /**
   * create session
   */
  const session = await refreshSessionRepository.createSession({
    userId: user.id,
    tokenHash: refreshTokenHash,
    expiresAt,
  });

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    clientId,
  });

  /**
   * cache session in Redis
   */
  await SessionCacheRepository.cacheSession(
    refreshTokenHash,
    {
      sessionId: session.id,
      userId: user.id,
      revoked: false,
      expiresAt: expiresAt.toISOString(),
    },
    refreshTokenTtl,
  );

  return {
    message: "Signin successful",
    accessToken,
    refreshToken,
  };
};
