import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  age: z.string().min(1, 'Age is required'),
  occupation: z.string().min(2, 'Occupation is required'),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
