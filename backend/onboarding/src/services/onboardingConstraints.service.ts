import { prisma } from "../lib/db.js";

import { replaceConstraints } from "../repositories/constraint.repository.js";

export async function saveConstraints(uid: string, payload: any) {
  return prisma.$transaction(async (tx) => {
    await replaceConstraints(tx, uid, payload.constraints);

    return {
      success: true,
    };
  });
}
