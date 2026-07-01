import { ZodSchema } from "zod";

// single common function to validate request body depending on whatever schema you pass into it
// can be reused at each route to validate as per the structure of request required for that service

export const validate =
  (schema: ZodSchema) => (req: any, res: any, next: any) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        errors: result.error.flatten(),
      });
    }

    req.body = result.data;

    next();
  };
