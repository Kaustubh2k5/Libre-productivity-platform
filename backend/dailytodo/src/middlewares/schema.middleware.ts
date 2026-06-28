import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateSchema<T>(
  schema: ZodSchema<T>
) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsedBody = schema.parse(req.body);

      req.body = parsedBody;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed.",
          errors: error.issues
        });
      }

      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };
}