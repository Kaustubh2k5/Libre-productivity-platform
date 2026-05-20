import { z } from "zod";
export const signupStartSchema = z.object({
  email: z.string().email(),

  password: z.string().min(8),

  clientId: z.string().min(1),
});

export const signupVerifySchema = z.object({
  email: z.string().email(),

  otp: z.string().length(6),

  clientId: z.string().min(1),
});
