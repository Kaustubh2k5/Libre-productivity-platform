import {
  Request,
  Response,
  NextFunction,
} from "express";

import { RateLimitService } from "../lib/rate-limit.service.js";

export const signupRateLimitMiddleware =
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;

      /**
       * check signup rate limit
       */
      await RateLimitService.checkSignupEmailLimit(
        email
      );

      next();
    } catch (error) {
      return res.status(429).json({
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Too many requests",
      });
    }
  };