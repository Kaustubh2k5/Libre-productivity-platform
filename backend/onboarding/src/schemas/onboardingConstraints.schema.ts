import { z } from "zod";

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const onboardingConstraintsSchema = z.object({
  hasConstraints: z.boolean(),

  constraints: z.array(
    z.object({
      name: z.string(),

      startTime: z.string().regex(timeRegex),

      endTime: z.string().regex(timeRegex),
    }),
  ),
});

export type OnboardingConstraintsRequest = z.infer<
  typeof onboardingConstraintsSchema
>;
