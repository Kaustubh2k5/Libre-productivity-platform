import { Router } from "express";
import {
  signupstart,
  verifySignup,
  signin,
  signout,
  refresh 
} from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  signupStartSchema,
  signupVerifySchema,
  signinSchema,
  signoutSchema,
  refreshSchema,
} from "../schemas/auth.schema.js";
import {
  signupRateLimitMiddleware,
  signinRateLimitMiddleware,
} from "../middlewares/rate-limit.middleware.js";

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

/**
 * Sign in user and create session
 * - validate credentials
 * - check membership
 * - generate tokens
 * - cache session
 */
router.post(
  "/signin",
  validate(signinSchema),
  signinRateLimitMiddleware,
  signin,
);

/**
 * Sign out user
 * - validate refresh token
 * - revoke refresh session
 * - remove cached session
 */
router.post("/signout", validate(signoutSchema), signout);

router.post("/refresh",validate(refreshSchema),refresh);
export default router;
