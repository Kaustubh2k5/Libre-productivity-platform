import { Router } from "express";
import { signupstart, verifySignup } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  signupStartSchema,
  signupVerifySchema,
} from "../schemas/auth.schema.js";
import { signupRateLimitMiddleware } from "../middlewares/rate-limit.middleware.js";

const router = Router();

/**
 * STEP 1
 * Initiate signup flow
 * - validate email/password
 * - generate OTP
 * - store temporary signup state in Redis
 */
router.post(
  "/signup/start",
  validate(signupStartSchema),
  signupRateLimitMiddleware,
  signupstart,
);

/**
 * STEP 2
 * Verify OTP and create account
 * - validate OTP
 * - create user
 * - create membership
 * - create refresh session
 * - generate tokens
 */
router.post(
  "/signup/verify",
  validate(signupVerifySchema),
  signupRateLimitMiddleware,
  verifySignup,
);

export default router;
