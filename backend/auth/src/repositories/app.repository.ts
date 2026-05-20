import { App } from "@prisma/client";
import { prisma } from "../lib/db.js";

export class AppRepository {
  async findByClientId(clientId: string): Promise<App | null> {
    return prisma.app.findUnique({
      where: {
        clientId,
      },
    });
  }

  async findById(id: string): Promise<App | null> {
    return prisma.app.findUnique({
      where: {
        id,
      },
    });
  }

  async getAllApps(): Promise<App[]> {
    return prisma.app.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
  }
}
