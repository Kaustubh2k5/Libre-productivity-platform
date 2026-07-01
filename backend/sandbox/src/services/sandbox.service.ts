import * as sandboxRepo from "../repositories/sandbox.repository.js";
import type { CreateTableRequest, UpdateTableRequest } from "../schemas/sandbox.schema.js";

export async function getAllTables(uid: string) {
  return sandboxRepo.findAllByUid(uid);
}

export async function createTable(uid: string, data: CreateTableRequest) {
  if (data.id) {
    const existing = await sandboxRepo.findByIdAndUid(data.id, uid);

    if (existing) {
      return sandboxRepo.updateOne(data.id, uid, data);
    }
  }

  return sandboxRepo.createOne(uid, data);
}

export async function updateTable(id: string, uid: string, data: UpdateTableRequest) {
  const existing = await sandboxRepo.findByIdAndUid(id, uid);

  if (!existing) {
    return null;
  }

  return sandboxRepo.updateOne(id, uid, data);
}

export async function deleteTable(id: string, uid: string) {
  const existing = await sandboxRepo.findByIdAndUid(id, uid);

  if (!existing) {
    return null;
  }

  return sandboxRepo.deleteOne(id, uid);
}
