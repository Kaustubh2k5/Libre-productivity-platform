import { Router } from "express";

import { verifyAccessToken } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validation.middleware.js";

import {
  createTableSchema,
  updateTableSchema,
} from "../schemas/sandbox.schema.js";

import {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} from "../controllers/sandbox.controller.js";

const router = Router();

// to apply auth middleware to all routes
router.use(verifyAccessToken);

// route 1 : to fetch all the user's tables (user's uid fetched from request header)
router.get("/tables", getTables);

// route 2 : to handle creation of a new table
router.post("/tables", validate(createTableSchema), createTable);

// route 3 : to handle column or value updation in a table
router.put("/tables/:id", validate(updateTableSchema), updateTable);

// route 4 : to handle deletion of a table
router.delete("/tables/:id", deleteTable);

export default router;
