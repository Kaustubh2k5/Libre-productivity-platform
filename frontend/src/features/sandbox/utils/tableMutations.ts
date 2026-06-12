import type { SandboxTable, SandboxColumn } from '../types/sandbox.types';
import { MAX_ROWS, MAX_COLS } from './tableFactories';

export function createNewColumnId(): string {
  return `col_${Date.now()}`;
}

export function createNewRowId(): string {
  return `row_${Date.now()}`;
}

export const atRowLimit = (table: SandboxTable): boolean => {
  return table.rows.length >= MAX_ROWS;
};

export const atColLimit = (table: SandboxTable): boolean => {
  return table.columns.length >= MAX_COLS;
};

export const createEmptyRow = (table: SandboxTable): Record<string, string | number> => {
  const row: Record<string, string | number> = {
    id: createNewRowId()
  };
  table.columns.forEach(col => {
    row[col.id] = col.type === 'number' ? 0 : '';
  });
  return row;
};

export const createDefaultTable = (): SandboxTable => ({
  id: `db_${Date.now()}`,
  name: 'default',
  description: 'Default matrix sheet.',
  columns: [
    { id: 'indicator_col', name: 'Item', type: 'text', isTracked: false },
    { id: 'value_col', name: 'Value', type: 'number', isTracked: true }
  ],
  rows: [
    { id: 'row-1', indicator_col: 'Initial Target', value_col: 100 }
  ]
});

export function createCustomTable(name: string, description: string): SandboxTable {
  return {
    id: `db_${Date.now()}`,
    name,
    description: description.trim() || 'Custom goal matrix.',
    columns: [
      { id: 'indicator_var', name: 'Goal Milestone', type: 'text', isTracked: false },
      { id: 'metric_var', name: 'Target Target Value', type: 'number', isTracked: true }
    ],
    rows: [
      { id: 'r2-1', indicator_var: 'Phase 1: Foundation Setup', metric_var: 10 },
      { id: 'r2-2', indicator_var: 'Phase 2: Performance Target', metric_var: 80 }
    ]
  };
}

export function insertColumnAt(
  table: SandboxTable,
  targetColId: string,
  newCol: SandboxColumn
): SandboxTable {
  const index = table.columns.findIndex(c => c.id === targetColId);
  if (index === -1) return table;

  const revisedColumns = [...table.columns];
  revisedColumns.splice(index + 1, 0, newCol);

  const revisedRows = table.rows.map(row => ({
    ...row,
    [newCol.id]: ''
  }));

  return {
    ...table,
    columns: revisedColumns,
    rows: revisedRows
  };
}

export function deleteColumnFrom(table: SandboxTable, colId: string): SandboxTable {
  const revisedCols = table.columns.filter(c => c.id !== colId);
  const revisedRows = table.rows.map(row => {
    const item = { ...row };
    delete item[colId];
    return item;
  });
  return {
    ...table,
    columns: revisedCols,
    rows: revisedRows
  };
}

export function insertRowAt(
  table: SandboxTable,
  targetRowId: string,
  newRow: Record<string, string | number>
): SandboxTable {
  const index = table.rows.findIndex(r => r.id === targetRowId);
  if (index === -1) return table;

  const revisedRows = [...table.rows];
  revisedRows.splice(index + 1, 0, newRow);

  return {
    ...table,
    rows: revisedRows
  };
}

export const appendRow = (table: SandboxTable): SandboxTable => ({
  ...table,
  rows: [...table.rows, createEmptyRow(table)]
});

export function appendColumn(table: SandboxTable, newCol: SandboxColumn): SandboxTable {
  return {
    ...table,
    columns: [...table.columns, newCol],
    rows: table.rows.map(row => ({
      ...row,
      [newCol.id]: ''
    }))
  };
}

export function updateCell(table: SandboxTable, rowId: string, colId: string, parsedValue: string | number): SandboxTable {
  return {
    ...table,
    rows: table.rows.map(r => r.id === rowId ? { ...r, [colId]: parsedValue } : r)
  };
}

export function deleteRow(table: SandboxTable, rowId: string): SandboxTable {
  return {
    ...table,
    rows: table.rows.filter(r => r.id !== rowId)
  };
}
