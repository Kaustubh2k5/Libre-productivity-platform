export async function upsertAssessment(tx: any, uid: string, payload: any) {
  return tx.userBehaviourCore.upsert({
    where: { uid },

    create: {
      uid,

      focusDuration: payload.focusDuration,

      distractionLevel: payload.distractionLevel,

      energyConsistency: payload.energyConsistency,

      taskInitiation: payload.taskInitiation,

      recoveryPattern: payload.recoveryPattern,
    },

    update: {
      focusDuration: payload.focusDuration,

      distractionLevel: payload.distractionLevel,

      energyConsistency: payload.energyConsistency,

      taskInitiation: payload.taskInitiation,

      recoveryPattern: payload.recoveryPattern,
    },
  });
}
