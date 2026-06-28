import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma.js";
import type { CreateTimetableRequest } from "../schemas/create-timetable.schema.js";

class TimetableRepository {

    /**
     * Find timetable by id
     */
    async findById(
        id: string,
        tx: Prisma.TransactionClient | PrismaClient = prisma
    ) {
        return tx.timetable.findUnique({
            where: { id },
            include: {
                slots: {
                    include: {
                        goal: true
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        });
    }

    /**
     * Find timetable for a user on a specific date
     */
    async findByUserAndDate(
        uid: string,
        date: Date,
        tx: Prisma.TransactionClient | PrismaClient = prisma
    ) {
        return tx.timetable.findUnique({
            where: {
                uid_date: {
                    uid,
                    date
                }
            },
            include: {
                slots: {
                    include: {
                        goal: true
                    },
                    orderBy: {
                        position: "asc"
                    }
                }
            }
        });
    }

    /**
     * Create a timetable with all slots
     */
    async create(
        uid: string,
        body: CreateTimetableRequest,
        tx: Prisma.TransactionClient | PrismaClient = prisma
    ) {

        return tx.timetable.create({

            data: {

                id: body.id,

                uid,

                date: new Date(body.date),

                timezone: body.timezone,

                slots: {

                    create: body.slots.map((slot, index) => ({

                        id: slot.id,

                        title: slot.title,

                        description: slot.description,

                        startTime: slot.startTime,

                        endTime: slot.endTime,

                        estimatedHours: slot.estimatedHours,

                        priority: slot.priority,

                        position: index,

                        goalId: slot.tag.id ?? null

                    }))
                }

            },

            include: {
                slots: true
            }

        });

    }

    /**
     * Replace every slot in a timetable
     */
    async update(

        timetableId: string,

        body: CreateTimetableRequest,

        tx: Prisma.TransactionClient | PrismaClient = prisma

    ) {

        return tx.timetable.update({

            where: {

                id: timetableId

            },

            data: {

                timezone: body.timezone,

                version: {

                    increment: 1

                },

                slots: {

                    deleteMany: {},

                    create: body.slots.map((slot, index) => ({

                        id: slot.id,

                        title: slot.title,

                        description: slot.description,

                        startTime: slot.startTime,

                        endTime: slot.endTime,

                        estimatedHours: slot.estimatedHours,

                        priority: slot.priority,

                        position: index,

                        goalId: slot.tag.id ?? null

                    }))

                }

            },

            include: {

                slots: true

            }

        });

    }

    /**
     * Soft delete timetable
     */
    async delete(

        timetableId: string,

        tx: Prisma.TransactionClient | PrismaClient = prisma

    ) {

        return tx.timetable.update({

            where: {

                id: timetableId

            },

            data: {

                isActive: false

            }

        });

    }

}

export default new TimetableRepository();