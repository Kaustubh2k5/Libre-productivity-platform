import { hashToken } from "../../lib/bcrypt.js";
import { generateAccessToken, generateRefreshToken } from "../../lib/tokens.js";
import { SessionCacheRepository } from "../../repositories/session-cache.repository.js";
import { RefreshSessionRepository } from "../../repositories/refresh-session.repository.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { MembershipRepository } from "../../repositories/membership.repository.js";

const userRepository = new UserRepository();
const membershipRepository = new MembershipRepository();
const refreshSessionRepository = new RefreshSessionRepository();

export async function refreshService(
  refreshToken: string,
) {
  const tokenHash = hashToken(refreshToken);

  let sessionId: string;
  let userId: string;
  let revoked: boolean;
  let expiresAt: Date;

  const cached =
    await SessionCacheRepository.getCachedSession(tokenHash);

  if (cached) {
    sessionId = cached.sessionId;
    userId = cached.userId;
    revoked = cached.revoked;
    expiresAt = new Date(cached.expiresAt);
  } else {
    const session =
      await refreshSessionRepository.findByTokenHash(tokenHash);

    if (!session) {
      throw new Error("Invalid refresh token");
    }

    sessionId = session.id;
    userId = session.userId;
    revoked = session.revoked;
    expiresAt = session.expiresAt;
  }

  if (revoked) {
    throw new Error("Refresh token revoked");
  }

  if (expiresAt.getTime() < Date.now()) {
    throw new Error("Refresh token expired");
  }

  const revokedInRedis =
    await SessionCacheRepository.isSessionRevoked(sessionId);

  if (revokedInRedis) {
    throw new Error("Refresh token revoked");
  }

  const user = await userRepository.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const membership = await membershipRepository.findFirstMembershipWithApp(userId,);

  if (!membership) {
    throw new Error("Membership not found");
  }

  const newRefreshToken = generateRefreshToken();

  const newTokenHash = hashToken(newRefreshToken);

  const accessToken = generateAccessToken({
    userId: user.id,
    email: user.email,
    clientId: membership.app.clientId,
  });

  const newExpiry = new Date(
    Date.now() + 30 * 24 * 60 * 60 * 1000,
  );

  const newSession =
    await refreshSessionRepository.createSession({
      userId: user.id,
      tokenHash: newTokenHash,
      expiresAt: newExpiry,
    });

  await refreshSessionRepository.revokeSession(
    sessionId,
  );

  await SessionCacheRepository.deleteCachedSession(
    tokenHash,
  );

  await SessionCacheRepository.cacheSession(
    newTokenHash,
    {
      sessionId: newSession.id,
      userId: user.id,
      revoked: false,
      expiresAt: newExpiry.toISOString(),
    },
    30 * 24 * 60 * 60,
  );

  await SessionCacheRepository.revokeSession(
    sessionId,
    30 * 24 * 60 * 60,
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}