export async function replaceConstraints(
    tx: any,
    uid: string,
    constraints: any[]
) {

    await tx.userConstraint.deleteMany({
        where: { uid }
    });

    await tx.userConstraint.createMany({
        data: constraints.map(c => ({
            uid,

            constraintTitle:
                c.title,

            description:
                c.description,

            days:
                c.days,

            startTime:
                c.startTime,

            endTime:
                c.endTime
        }))
    });
}