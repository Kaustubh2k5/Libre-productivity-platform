import { Router } from "express";
import { getGoalTemplates, createGoalLog, createTimetableSlot } from "../controllers/todo.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = Router();

// Apply auth middleware to all routes
router.use(verifyAccessToken);

router.get("/goal-templates", getGoalTemplates);
router.post("/goal-logs", createGoalLog);
router.post("/timetable-slots", createTimetableSlot);

export default router;
