import { Prisma, PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma.js";

export interface CreateOutboxEvent {
    topic: string;
    eventType: string;
    payload: Prisma.JsonObject;
}

class OutboxRepository {

    async create(
        event: CreateOutboxEvent,
        tx: Prisma.TransactionClient | PrismaClient = prisma
    ) {

        return tx.outboxEvent.create({

            data: {

                topic: event.topic,

                eventType: event.eventType,

                payload: event.payload,

                status: "PENDING"

            }

        });

    }

    async getPendingEvents(
        limit = 100,
        tx: Prisma.TransactionClient | PrismaClient = prisma
    ) {

        return tx.outboxEvent.findMany({

            where: {

                status: "PENDING"

            },

            orderBy: {

                createdAt: "asc"

            },

            take: limit

        });

    }

    async markAsSent(
        id: string,
        tx: Prisma.TransactionClient | PrismaClient = prisma
    ) {

        return tx.outboxEvent.update({

            where: {

                id

            },

            data: {

                status: "SENT"

            }

        });

    }

    async markAsFailed(
        id: string,
        tx: Prisma.TransactionClient | PrismaClient = prisma
    ) {

        return tx.outboxEvent.update({

            where: {

                id

            },

            data: {

                status: "FAILED"

            }

        });

    }

}

export default new OutboxRepository();