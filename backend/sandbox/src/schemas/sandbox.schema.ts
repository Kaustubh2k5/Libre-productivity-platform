import { z } from "zod";

const columnSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  type: z.enum(["text", "number", "date"]),
  isTracked: z.boolean(),
});

const rowSchema = z.record(z.string(), z.union([z.string(), z.number()]));

export const createTableSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1, { message: "Table name must not be empty" }),
  description: z.string().optional().default(""),
  columns: z.array(columnSchema).min(1, { message: "At least one column is required" }),
  rows: z.array(rowSchema).default([]),
});

export const updateTableSchema = z.object({
  id: z.string().min(1).optional(),
  name: z.string().min(1, { message: "Table name must not be empty" }).optional(),
  description: z.string().optional(),
  columns: z.array(columnSchema).optional(),
  rows: z.array(rowSchema).optional(),
});

export type CreateTableRequest = z.infer<typeof createTableSchema>;
export type UpdateTableRequest = z.infer<typeof updateTableSchema>;
