import prisma from "../lib/prisma.js";

import timetableRepository from "../repositories/time-table.repository.js";
import outboxRepository from "../repositories/outbox.repository.js";

import type { CreateTimetableRequest } from "../schemas/create-timetable.schema.js";

import { TOPICS } from "../events/topics.js";

class TimetableService {

    async createOrUpdate(
        uid: string,
        payload: CreateTimetableRequest
    ) {

        return prisma.$transaction(async (tx) => {

            const existing =
                await timetableRepository.findByUserAndDate(
                    uid,
                    new Date(payload.date),
                    tx
                );

            if (!existing) {

                const timetable =
                    await timetableRepository.create(
                        uid,
                        payload,
                        tx
                    );

                await outboxRepository.create(
                    {
                        topic: TOPICS.TIMETABLE_CREATED,

                        eventType: "TIMETABLE_CREATED",

                        payload: {
                            uid,
                            timetableId: timetable.id,
                            date: payload.date
                        }

                    },
                    tx
                );

                return timetable;
            }

            const updated =
                await timetableRepository.update(
                    existing.id,
                    payload,
                    tx
                );

            await outboxRepository.create(
                {
                    topic: TOPICS.TIMETABLE_UPDATED,

                    eventType: "TIMETABLE_UPDATED",

                    payload: {
                        uid,
                        timetableId: updated.id,
                        date: payload.date
                    }

                },
                tx
            );

            return updated;

        });

    }

    async delete(
        uid: string,
        timetableId: string
    ) {

        return prisma.$transaction(async (tx) => {

            const timetable =
                await timetableRepository.findById(
                    timetableId,
                    tx
                );

            if (!timetable) {
                throw new Error("Timetable not found.");
            }

            if (timetable.uid !== uid) {
                throw new Error("Unauthorized.");
            }

            await timetableRepository.delete(
                timetableId,
                tx
            );

            await outboxRepository.create(
                {
                    topic: TOPICS.TIMETABLE_DELETED,

                    eventType: "TIMETABLE_DELETED",

                    payload: {
                        uid,
                        timetableId,
                        date: timetable.date.toISOString()
                    }

                },
                tx
            );

        });

    }

}

export default new TimetableService();