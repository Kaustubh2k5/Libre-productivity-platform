import { Router } from "express";

import {
  createOrUpdateTimetable,
  deleteTimetable
} from "../controllers/todo.controller.js";

import { validateSchema } from "../middlewares/schema.middleware.js";
import { createTimetableSchema } from "../schemas/create-timetable.schema.js";
import { validateNoOverlap } from "../middlewares/overlap.middleware.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * Create or update a timetable for a given day.
 *
 * Flow:
 * Auth
 * → Schema Validation
 * → Overlap Validation
 * → Controller
 */
router.post(
  "/",
  verifyAccessToken,
  validateSchema(createTimetableSchema),
  validateNoOverlap,
  createOrUpdateTimetable
);

/**
 * Get a timetable by id
 */
router.get(
  "/:id",
  verifyAccessToken,
  async (req, res) => {
    res.status(501).json({
      success: false,
      message: "Not implemented."
    });
  }
);

/**
 * Delete timetable
 */
router.delete(
  "/:id",
  verifyAccessToken,
  deleteTimetable
);

export default router;