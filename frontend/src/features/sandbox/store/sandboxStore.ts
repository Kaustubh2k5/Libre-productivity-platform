import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SandboxTable, SandboxColumn } from '../types/sandbox.types';
import { INITIAL_TABLE_TEMPLATES } from '../utils/presets';
import {
  getUniqueTableName,
  getUniqueColumnName,
  validateColumnName,
  validateTableName,
} from '../schemas/sandbox.schema';
import {
  createNewColumnId,
  insertColumnAt,
  deleteColumnFrom,
  insertRowAt,
  atRowLimit,
  atColLimit,
  createEmptyRow,
  appendRow,
  appendColumn,
  updateCell,
  deleteRow,
} from '../utils/tableMutations';

import { createDefaultTable, createGoalTable, MAX_ROWS, MAX_COLS } from '../utils/tableFactories';

export interface SandboxStoreState {
  tables: SandboxTable[];
  activeTableId: string;

  setActiveTableId: (id: string) => void;

  createTable: (name: string, description: string) => string | null;
  deleteTable: (id: string) => void;

  appendRow: () => string | null;
  deleteRow: (rowId: string) => string | null;
  insertRowBelow: (targetRowId: string) => string | null;

  appendColumn: () => string | null;
  deleteColumn: (colId: string) => string | null;
  insertColumnBeside: (targetColId: string) => string | null;

  updateCell: (rowId: string, colId: string, rawInput: string) => void;
  updateColumn: (colId: string, updates: Partial<SandboxColumn>) => string | null;

  replaceActiveTable: (updatedTable: Partial<SandboxTable>) => void;
  factoryResetSystem: () => void;
}

const useSandboxStoreBase = create<SandboxStoreState>()(
  persist(
    (set, get) => ({
      tables: INITIAL_TABLE_TEMPLATES,
      activeTableId: 'default',

      setActiveTableId: (id) => {
        set({ activeTableId: id });
      },

      createTable: (name, description) => {
        let validatedName = name;
        try {
          validatedName = validateTableName(name);
        } catch (err: any) {
          return err.message;
        }

        const { tables } = get();
        if (tables.length >= 2) {
          return 'Sandbox Limit: A maximum of two custom matrices can be active simultaneously';
        }

        const uniqueName = getUniqueTableName(validatedName, tables);
        const newTable = createGoalTable(uniqueName, description);

        set({
          tables: [...tables, newTable],
          activeTableId: newTable.id,
        });
        return null;
      },

      deleteTable: (id) => {
        set((state) => {
          if (state.tables.length <= 1) {
            const cleanTable = createDefaultTable();
            return {
              tables: [cleanTable],
              activeTableId: cleanTable.id,
            };
          }
          const remaining = state.tables.filter((t) => t.id !== id);
          const nextActiveId = state.activeTableId === id ? remaining[0].id : state.activeTableId;
          return {
            tables: remaining,
            activeTableId: nextActiveId,
          };
        });
      },

      appendRow: () => {
        const table = get().tables.find((t) => t.id === get().activeTableId);
        if (!table) return 'No active table';
        if (atRowLimit(table)) {
          return `Limit reached: Maximum of ${MAX_ROWS} rows are allowed per table`;
        }
        set((state) => ({
          tables: state.tables.map((t) => (t.id === state.activeTableId ? appendRow(t) : t)),
        }));
        return null;
      },

      deleteRow: (rowId) => {
        const table = get().tables.find((t) => t.id === get().activeTableId);
        if (!table) return 'No active table';
        if (table.rows.length <= 1) {
          return 'Keep at least one row in the table matrix';
        }
        set((state) => ({
          tables: state.tables.map((t) => (t.id === state.activeTableId ? deleteRow(t, rowId) : t)),
        }));
        return null;
      },

      insertRowBelow: (targetRowId) => {
        const table = get().tables.find((t) => t.id === get().activeTableId);
        if (!table) return 'No active table';
        if (atRowLimit(table)) {
          return `Limit reached: Maximum of ${MAX_ROWS} rows are allowed per table`;
        }
        const newRow = createEmptyRow(table);
        set((state) => ({
          tables: state.tables.map((t) =>
            t.id === state.activeTableId ? insertRowAt(t, targetRowId, newRow) : t,
          ),
        }));
        return null;
      },

      appendColumn: () => {
        const table = get().tables.find((t) => t.id === get().activeTableId);
        if (!table) return 'No active table';
        if (atColLimit(table)) {
          return `Limit reached: Maximum of ${MAX_COLS} columns are allowed per table`;
        }
        const nextColId = createNewColumnId();
        const uniqueColName = getUniqueColumnName(`Col ${table.columns.length + 1}`, table.columns);
        const newCol: SandboxColumn = {
          id: nextColId,
          name: uniqueColName,
          type: 'text',
          isTracked: false,
        };
        set((state) => ({
          tables: state.tables.map((t) =>
            t.id === state.activeTableId ? appendColumn(t, newCol) : t,
          ),
        }));
        return null;
      },

      deleteColumn: (colId) => {
        const table = get().tables.find((t) => t.id === get().activeTableId);
        if (!table) return 'No active table';
        if (table.columns.length <= 1) {
          return 'Keep at least one column in your matrix';
        }
        set((state) => ({
          tables: state.tables.map((t) =>
            t.id === state.activeTableId ? deleteColumnFrom(t, colId) : t,
          ),
        }));
        return null;
      },

      insertColumnBeside: (targetColId) => {
        const table = get().tables.find((t) => t.id === get().activeTableId);
        if (!table) return 'No active table';
        if (atColLimit(table)) {
          return `Limit reached: Maximum of ${MAX_COLS} columns are allowed per table`;
        }
        const nextColId = createNewColumnId();
        const uniqueColName = getUniqueColumnName(`New Variable`, table.columns);
        const newCol: SandboxColumn = {
          id: nextColId,
          name: uniqueColName,
          type: 'text',
          isTracked: false,
        };
        set((state) => ({
          tables: state.tables.map((t) =>
            t.id === state.activeTableId ? insertColumnAt(t, targetColId, newCol) : t,
          ),
        }));
        return null;
      },

      updateCell: (rowId, colId, rawInput) => {
        set((state) => ({
          tables: state.tables.map((tbl) => {
            if (tbl.id !== state.activeTableId) return tbl;
            const colDef = tbl.columns.find((c) => c.id === colId);
            let parsedInput: string | number = rawInput;

            if (colDef?.type === 'number') {
              const castValue = Number(rawInput);
              parsedInput = isNaN(castValue) ? rawInput : castValue;
            }
            return updateCell(tbl, rowId, colId, parsedInput);
          }),
        }));
      },

      updateColumn: (colId, updates) => {
        if (updates.name !== undefined) {
          try {
            updates.name = validateColumnName(updates.name);
          } catch (err: any) {
            return err.message;
          }
        }
        set((state) => {
          const tables = state.tables.map((tbl) => {
            if (tbl.id !== state.activeTableId) return tbl;

            let revisedCols = tbl.columns;
            if (updates.name !== undefined) {
              updates.name = getUniqueColumnName(updates.name, tbl.columns, colId);
            }

            const targetCol = tbl.columns.find((c) => c.id === colId);
            const nextType = updates.type || targetCol?.type;
            if (nextType === 'text') {
              updates.isTracked = false;
            }

            revisedCols = tbl.columns.map((c) => (c.id === colId ? { ...c, ...updates } : c));

            let revisedRows = tbl.rows;
            if (updates.type) {
              revisedRows = tbl.rows.map((row) => {
                const val = row[colId];
                if (updates.type === 'number') {
                  const num = Number(val);
                  return { ...row, [colId]: isNaN(num) ? 0 : num };
                } else if (updates.type === 'date') {
                  return { ...row, [colId]: String(val || '') };
                }
                return row;
              });
            }

            return { ...tbl, columns: revisedCols, rows: revisedRows };
          });
          return { tables };
        });
        return null;
      },

      replaceActiveTable: (updatedTable) => {
        set((state) => ({
          tables: state.tables.map((t) =>
            t.id === state.activeTableId ? { ...t, ...updatedTable } : t,
          ),
        }));
      },

      factoryResetSystem: () => {
        set({
          tables: INITIAL_TABLE_TEMPLATES,
          activeTableId: 'default',
        });
      },
    }),
    {
      name: 'libre_infinite_sandbox_store_v2',
      partialize: (state) => ({
        tables: state.tables,
        activeTableId: state.activeTableId,
      }),
    },
  ),
);

export const useSandboxStore = useSandboxStoreBase;
