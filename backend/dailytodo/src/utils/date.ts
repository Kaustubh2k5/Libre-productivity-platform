export function getToday(): Date {
    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );

    return today;
}

export function getTomorrow(): Date {
    const tomorrow = new Date();

    tomorrow.setDate(
        tomorrow.getDate() + 1
    );

    tomorrow.setHours(
        0,
        0,
        0,
        0
    );

    return tomorrow;
}

export function normalizeDate(
    date: string | Date
): Date {

    const normalized =
        new Date(date);

    normalized.setHours(
        0,
        0,
        0,
        0
    );

    return normalized;
}

export function isSameDay(
    first: Date,
    second: Date
): boolean {

    return (
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() &&
        first.getDate() === second.getDate()
    );
}