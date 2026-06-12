export async function upsertUserCore(
    tx: any,
    uid: string,
    payload: any
) {
    return tx.userCore.upsert({
        where: { uid },

        create: {
            uid,
            name: payload.name,
            dob: new Date(payload.dob),
            occupation: payload.occupation
        },

        update: {
            name: payload.name,
            dob: new Date(payload.dob),
            occupation: payload.occupation
        }
    });
}