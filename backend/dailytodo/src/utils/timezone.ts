import {
    fromZonedTime,
    toZonedTime
} from "date-fns-tz";

export function getUserTimezone(
    timezone?: string
): string {
    return (
        timezone ??
        Intl.DateTimeFormat()
            .resolvedOptions()
            .timeZone
    );
}

export function zonedToUtc(
    date: Date,
    timezone: string
): Date {
    return fromZonedTime(
        date,
        timezone
    );
}

export function utcToZoned(
    date: Date,
    timezone: string
): Date {
    return toZonedTime(
        date,
        timezone
    );
}

export function getCurrentTimeInTimezone(
    timezone: string
): Date {

    return utcToZoned(
        new Date(),
        timezone
    );
}

export function getStartOfDayInTimezone(
    timezone: string
): Date {

    const local =
        getCurrentTimeInTimezone(
            timezone
        );

    local.setHours(
        0,
        0,
        0,
        0
    );

    return zonedToUtc(
        local,
        timezone
    );
}

export function getTomorrowInTimezone(
    timezone: string
): Date {

    const local =
        getCurrentTimeInTimezone(
            timezone
        );

    local.setDate(
        local.getDate() + 1
    );

    local.setHours(
        0,
        0,
        0,
        0
    );

    return zonedToUtc(
        local,
        timezone
    );
}