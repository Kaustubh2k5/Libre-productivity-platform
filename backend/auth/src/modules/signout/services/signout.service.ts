import { hashToken } from "../../../lib/bcrypt.js";
import { RefreshSessionRepository } from "../../../repositories/refresh-session.repository.js";
import { SessionCacheRepository } from "../../../repositories/session-cache.repository.js";

const refreshSessionRepository = new RefreshSessionRepository();

interface SignoutInput {
  refreshToken: string;
}

export const signoutService = async ({ refreshToken }: SignoutInput) => {
  const refreshTokenHash = hashToken(refreshToken);

  const session =
    await refreshSessionRepository.findByTokenHash(refreshTokenHash);

  if (!session || session.revoked) {
    await SessionCacheRepository.deleteCachedSession(refreshTokenHash);

    return {
      message: "Already signed out",
    };
  }

  await refreshSessionRepository.revokeSession(session.id);

  await SessionCacheRepository.deleteCachedSession(refreshTokenHash);

  return {
    message: "Signed out successfully",
  };
};
