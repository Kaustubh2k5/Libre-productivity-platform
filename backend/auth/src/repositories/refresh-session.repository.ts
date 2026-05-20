import {
  Prisma,
  RefreshSession,
} from "@prisma/client";

import { prisma } from "../lib/db.js";

interface CreateRefreshSessionInput {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}

export class RefreshSessionRepository {
  async createSession(
    data: CreateRefreshSessionInput,
    tx: Prisma.TransactionClient = prisma
  ): Promise<RefreshSession> {
    return tx.refreshSession.create({
      data: {
        userId: data.userId,
        tokenHash:
          data.tokenHash,
        expiresAt:
          data.expiresAt,
      },
    });
  }

  async findByTokenHash(
    tokenHash: string
  ): Promise<RefreshSession | null> {
    return prisma.refreshSession.findUnique({
      where: {
        tokenHash,
      },
    });
  }

  async revokeSession(
    sessionId: string
  ): Promise<RefreshSession> {
    return prisma.refreshSession.update({
      where: {
        id: sessionId,
      },
      data: {
        revoked: true,
      },
    });
  }

  async revokeAllUserSessions(
    userId: string
  ): Promise<void> {
    await prisma.refreshSession.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
  }

  async deleteExpiredSessions(): Promise<void> {
    await prisma.refreshSession.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}