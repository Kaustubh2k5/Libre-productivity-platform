import { Prisma, Membership } from "@prisma/client";

import { prisma } from "../lib/db.js";

interface CreateMembershipInput {
  userId: string;
  appId: string;
}

export class MembershipRepository {
  async createMembership(
    data: CreateMembershipInput,
    tx: Prisma.TransactionClient = prisma,
  ): Promise<Membership> {
    return tx.membership.create({
      data: {
        userId: data.userId,
        appId: data.appId,
      },
    });
  }

  async findMembership(
    userId: string,
    appId: string,
  ): Promise<Membership | null> {
    return prisma.membership.findUnique({
      where: {
        userId_appId: {
          userId,
          appId,
        },
      },
    });
  }

  async getUserMemberships(userId: string): Promise<Membership[]> {
    return prisma.membership.findMany({
      where: {
        userId,
      },
    });
  }

  async removeMembership(userId: string, appId: string): Promise<Membership> {
    return prisma.membership.delete({
      where: {
        userId_appId: {
          userId,
          appId,
        },
      },
    });
  }

  async findFirstMembershipWithApp(userId: string) {
    return prisma.membership.findFirst({
      where: {
        userId,
      },
      include: {
        app: true,
      },
    });
  }
}
