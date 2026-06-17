export async function replaceConstraints(
  tx: any,
  uid: string,
  constraints: any[],
) {
  await tx.userConstraint.deleteMany({
    where: { uid },
  });

  if (constraints.length > 0) {
    await tx.userConstraint.createMany({
      data: constraints.map((constraint) => ({
        uid,

        name: constraint.name,

        startTime: constraint.startTime,

        endTime: constraint.endTime,
      })),
    });
  }

  await tx.userCore.update({
    where: { uid },

    data: {
      constraintsCompleted: true,
    },
  });
}
