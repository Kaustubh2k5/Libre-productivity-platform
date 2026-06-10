import { useMemo } from 'react';
import { useSandboxStore } from '../store/sandboxStore';
import type { SandboxTable } from '../types/sandbox.types';

export function useActiveTable(): SandboxTable | undefined {
  const tables = useSandboxStore((s) => s.tables);
  const activeTableId = useSandboxStore((s) => s.activeTableId);

  return useMemo(() => {
    return tables.find((t) => t.id === activeTableId) || tables[0];
  }, [tables, activeTableId]);
}
