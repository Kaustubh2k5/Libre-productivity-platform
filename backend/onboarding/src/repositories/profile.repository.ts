export async function upsertProfile(tx: any, uid: string, payload: any) {
  return tx.userCore.upsert({
    where: { uid },

    create: {
      uid,

      fullName: payload.fullName,

      dateOfBirth: new Date(payload.dateOfBirth),

      occupation: payload.occupation,

      profileCompleted: true,
    },

    update: {
      fullName: payload.fullName,

      dateOfBirth: new Date(payload.dateOfBirth),

      occupation: payload.occupation,

      profileCompleted: true,
    },
  });
}
