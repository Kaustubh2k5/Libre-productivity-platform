import { z } from "zod";

export const timetableSlotSchema = z.object({

    id: z.string(),

    title: z.string().min(1),

    description: z.string().optional(),

    startTime: z.string(),

    endTime: z.string(),

    estimatedHours: z.number(),

    priority: z.enum([
        "LOW",
        "MEDIUM",
        "HIGH"
    ]),

    tag: z.object({

        id: z.string().optional(),

        name: z.string(),

        existsOnServer: z.boolean()

    })

});

export const createTimetableSchema = z.object({

    id: z.string(),

    date: z.string(),

    timezone: z.string(),

    slots: z.array(timetableSlotSchema)

});

export type CreateTimetableRequest =
  z.infer<typeof createTimetableSchema>;

export type TimetableSlotRequest =
  z.infer<typeof timetableSlotSchema>;