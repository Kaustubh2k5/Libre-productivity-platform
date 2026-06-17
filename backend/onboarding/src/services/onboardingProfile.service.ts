import { prisma } from "../lib/db.js";

import { upsertProfile }
from "../repositories/profile.repository.js";

import { upsertAssessment }
from "../repositories/assessment.repository.js";

export async function saveProfile(
  uid: string,
  payload: any
) {
  return prisma.$transaction(
    async (tx) => {

      await upsertProfile(
        tx,
        uid,
        payload
      );

      await upsertAssessment(
        tx,
        uid,
        payload
      );

      return {
        success: true
      };
    }
  );
}