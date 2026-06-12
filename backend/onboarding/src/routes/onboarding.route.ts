import { Router } from "express";

import { verifyToken }
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
    verifyToken,
    validate(onboardingSchema),
    onboardController
);

export default router;