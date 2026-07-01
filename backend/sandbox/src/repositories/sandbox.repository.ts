import { prisma } from "../lib/prisma.js";
import type { CreateTableRequest, UpdateTableRequest } from "../schemas/sandbox.schema.js";

export async function findAllByUid(uid: string) {
  return prisma.sandboxTable.findMany({
    where: { uid },
    orderBy: { createdAt: "desc" },
  });
}

export async function findByIdAndUid(id: string, uid: string) {
  return prisma.sandboxTable.findFirst({
    where: { id, uid },
  });
}

export async function createOne(uid: string, data: CreateTableRequest) {
  return prisma.sandboxTable.create({
    data: {
      ...(data.id !== undefined && { id: data.id }),
      uid,
      name: data.name,
      description: data.description || "",
      columns: data.columns as any,
      rows: data.rows as any,
    },
  });
}

export async function updateOne(id: string, uid: string, data: UpdateTableRequest) {
  return prisma.sandboxTable.update({
    where: { id },
    data: {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.columns !== undefined && { columns: data.columns as any }),
      ...(data.rows !== undefined && { rows: data.rows as any }),
    },
  });
}

export async function deleteOne(id: string, uid: string) {
  return prisma.sandboxTable.delete({
    where: { id },
  });
}
