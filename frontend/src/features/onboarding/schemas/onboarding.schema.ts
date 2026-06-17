import { z } from 'zod';

export const profileSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  occupation: z.string().min(2, 'Occupation is required'),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
