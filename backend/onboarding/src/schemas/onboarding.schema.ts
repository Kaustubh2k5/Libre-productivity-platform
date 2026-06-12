import { z } from "zod";

export const onboardingSchema = z.object({
    name: z.string().min(1),

    dob: z.string(),

    occupation: z.string(),

    avgEnergyLevel: z.number(),

    avgProductiveTime: z.number(),

    initialisationArchetype: z.string(),

    recoveryArchetype: z.string(),

    constraints: z.array(
        z.object({
            title: z.string(),

            description: z.string().optional(),

            days: z.array(z.string()),

            startTime: z.string(),

            endTime: z.string()
        })
    )
});

export type OnboardingRequest = z.infer<typeof onboardingSchema>;