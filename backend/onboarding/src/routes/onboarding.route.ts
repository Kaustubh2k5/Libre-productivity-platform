import { Router } from "express";

import { verifyAccessToken }
from "../middlewares/auth.middleware.js";

import { validate }
from "../middlewares/validation.middleware.js";

import { onboardingSchema }
from "../schemas/onboarding.schema.js";

import { onboardController }
from "../controllers/onboarding.controller.js";

const router = Router();

router.post(
    "/",
    verifyAccessToken,
    validate(onboardingSchema),
    onboardController
);

export default router;