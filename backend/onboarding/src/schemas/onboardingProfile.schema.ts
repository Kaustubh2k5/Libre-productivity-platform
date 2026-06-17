import { z } from "zod";

export const onboardingProfileSchema = z.object({
  fullName: z.string().min(1),

  dateOfBirth: z
    .string()
    .refine((value: any) => !isNaN(Date.parse(value)), "Invalid date"),

  occupation: z.string().min(1),

  focusDuration: z.string(),

  distractionLevel: z.string(),

  energyConsistency: z.string(),

  taskInitiation: z.string(),

  recoveryPattern: z.string(),
});

export type OnboardingProfileRequest = z.infer<typeof onboardingProfileSchema>;
