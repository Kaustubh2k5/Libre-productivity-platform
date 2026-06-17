import { Router } from "express";

import { verifyAccessToken } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validation.middleware.js";

import { onboardingProfileSchema } from "../schemas/onboardingProfile.schema.js";

import { onboardingConstraintsSchema } from "../schemas/onboardingConstraints.schema.js";

import { onboardingProfileController } from "../controllers/onboardingProfile.controller.js";

import { onboardingConstraintsController } from "../controllers/onboardingConstraints.controller.js";

const router = Router();

router.post(
  "/profile",
  verifyAccessToken,
  validate(onboardingProfileSchema),
  onboardingProfileController,
);

router.post(
  "/constraints",
  verifyAccessToken,
  validate(onboardingConstraintsSchema),
  onboardingConstraintsController,
);

export default router;
