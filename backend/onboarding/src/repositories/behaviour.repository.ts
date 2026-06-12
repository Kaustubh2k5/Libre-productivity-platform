export async function upsertBehaviour(
    tx: any,
    uid: string,
    payload: any
) {
    return tx.userBehaviourCore.upsert({
        where: { uid },

        create: {
            uid,
            avgEnergyLevel:
                payload.avgEnergyLevel,

            avgProductiveTime:
                payload.avgProductiveTime,

            initialisationArchetype:
                payload.initialisationArchetype,

            recoveryArchetype:
                payload.recoveryArchetype
        },

        update: {
            avgEnergyLevel:
                payload.avgEnergyLevel,

            avgProductiveTime:
                payload.avgProductiveTime,

            initialisationArchetype:
                payload.initialisationArchetype,

            recoveryArchetype:
                payload.recoveryArchetype
        }
    });
}