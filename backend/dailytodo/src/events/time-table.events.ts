import { randomUUID } from "crypto";
import publisher from "../kafka/event-publisher.js";
import { TOPICS } from "./topics.js";

interface TimetableEventData {
    uid: string;
    timetableId: string;
    date: string;
}

const createEventEnvelope = (
    eventType: string,
    data: TimetableEventData
) => ({
    eventId: randomUUID(),
    eventType,
    timestamp: new Date().toISOString(),
    data,
});

export async function publishTimetableCreated(
    data: TimetableEventData
) {
    await publisher.publish(
        TOPICS.TIMETABLE_CREATED,
        createEventEnvelope(
            "TIMETABLE_CREATED",
            data
        )
    );
}

export async function publishTimetableUpdated(
    data: TimetableEventData
) {
    await publisher.publish(
        TOPICS.TIMETABLE_UPDATED,
        createEventEnvelope(
            "TIMETABLE_UPDATED",
            data
        )
    );
}

export async function publishTimetableDeleted(
    data: TimetableEventData
) {
    await publisher.publish(
        TOPICS.TIMETABLE_DELETED,
        createEventEnvelope(
            "TIMETABLE_DELETED",
            data
        )
    );
}