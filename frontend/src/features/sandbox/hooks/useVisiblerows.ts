import { useMemo } from 'react';
import type { SandboxTable } from '../types/sandbox.types';

export function useVisibleRows(activeTable: SandboxTable | undefined, searchFilter: string) {
  return useMemo(() => {
    if (!activeTable) return [];
    if (!searchFilter.trim()) return activeTable.rows;
    const query = searchFilter.toLowerCase();
    return activeTable.rows.filter(row => {
      return activeTable.columns.some(col => {
        const val = row[col.id];
        return val !== undefined && String(val).toLowerCase().includes(query);
      });
    });
  }, [activeTable, searchFilter]);
}
