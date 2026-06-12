import { prisma } from "../lib/db.js";

import { upsertUserCore } from "../repositories/user.repository.js";

import { upsertBehaviour } from "../repositories/behaviour.repository.js";

import { replaceConstraints } from "../repositories/constraint.repository.js";

export async function onboardUser(
    uid: string,
    payload: any
) {
    return prisma.$transaction(
        async (tx) => {

            await upsertUserCore(
                tx,
                uid,
                payload
            );

            await upsertBehaviour(
                tx,
                uid,
                payload
            );

            await replaceConstraints(
                tx,
                uid,
                payload.constraints
            );

            return {
                success: true
            };
        }
    );
}