import { z } from 'zod';
import type { SandboxColumn, SandboxTable } from '../types/sandbox.types';

// Zod schemas for Sandbox types
export const ColumnSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Column name must not be empty" }),
  type: z.enum(['text', 'number', 'date']),
  isTracked: z.boolean(),
});

export const TableSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: "Table name must not be empty" }),
  description: z.string(),
  columns: z.array(ColumnSchema),
  rows: z.array(z.record(z.string(), z.union([z.string(), z.number()]))),
});

export function validateTableName(name: string): string {
  const parsed = z.string().min(1, { message: "Table name must not be empty" }).safeParse(name);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }
  return parsed.data;
}

export function validateColumnName(name: string): string {
  const parsed = z.string().min(1, { message: "Column name must not be empty" }).safeParse(name);
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0].message);
  }
  return parsed.data;
}

/**
 * Normalizes and produces a unique table name among the list of existing tables.
 * If a duplication is found, it appends or increments (1), (2), etc.
 */
export function getUniqueTableName(
  desiredName: string,
  existingTables: { id: string; name: string }[],
  ignoreTableId?: string
): string {
  let name = desiredName.trim();
  if (!name) name = "default";
  
  let baseName = name;
  const match = name.match(/^(.*?)\s*\((\d+)\)$/);
  if (match) {
    baseName = match[1].trim();
  }

  let candidate = name;
  let counter = 1;

  while (
    existingTables.some(
      t => t.id !== ignoreTableId && t.name.toLowerCase() === candidate.toLowerCase()
    )
  ) {
    candidate = `${baseName} (${counter})`;
    counter++;
  }

  return candidate;
}

/**
 * Normalizes and produces a unique column name within a single list of columns.
 * If a duplication is found, it appends or increments (1), (2), etc.
 */
export function getUniqueColumnName(
  desiredName: string,
  existingColumns: { id: string; name: string }[],
  ignoreColumnId?: string
): string {
  let name = desiredName.trim();
  if (!name) name = "Column";

  let baseName = name;
  const match = name.match(/^(.*?)\s*\((\d+)\)$/);
  if (match) {
    baseName = match[1].trim();
  }

  let candidate = name;
  let counter = 1;

  while (
    existingColumns.some(
      c => c.id !== ignoreColumnId && c.name.toLowerCase() === candidate.toLowerCase()
    )
  ) {
    candidate = `${baseName} (${counter})`;
    counter++;
  }

  return candidate;
}
