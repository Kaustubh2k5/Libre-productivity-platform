import { PrismaClient, Prisma, User } from "@prisma/client";

const prisma = new PrismaClient();

interface CreateUserInput {
  email: string;
  passwordHash: string;
  name?: string;
}

export class UserRepository {
  async createUser(
    data: CreateUserInput,
    tx: Prisma.TransactionClient = prisma,
  ): Promise<User> {
    return tx.user.create({
      data: {
        email: data.email,
        passwordHash: data.passwordHash,
        name: data.name,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async updateEmailVerification(userId: string): Promise<User> {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isEmailVerified: true,
      },
    });
  }

  async deactivateUser(userId: string): Promise<User> {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isActive: false,
      },
    });
  }
}
