import React, { FC } from 'react';
import { useSandboxStore } from '../../store/sandboxStore';
import type { SandboxColumn } from '../../types/sandbox.types';

interface TableCellProps {
  row: Record<string, string | number>;
  col: SandboxColumn;
}

const TableCell: FC<TableCellProps> = ({ row, col }) => {
  const { updateCell } = useSandboxStore();
  const cellValue = row[col.id];

  return (
    <td 
      className={`p-0 border-r border-white/10 last:border-0 transition-colors overflow-visible ${
        col.isTracked ? 'bg-red-500/[0.02]' : ''
      }`}
    >
      <input
        type={col.type === 'date' ? 'date' : 'text'}
        inputMode={col.type === 'number' ? 'decimal' : undefined}
        value={cellValue === undefined ? '' : cellValue}
        onChange={(e) => updateCell(row.id as string, col.id, e.target.value)}
        onPointerDown={(e) => e.stopPropagation()}
        placeholder={col.type === 'number' ? '0' : '—'}
        className={`w-full bg-transparent outline-none py-3 px-4 hover:bg-white/[0.01]/50 focus:bg-black/35 focus:border-b-2 focus:border-red-500 transition-all text-xs font-mono text-zinc-100 [color-scheme:dark] ${
          col.type === 'number' 
            ? 'text-right text-red-300 font-semibold' 
            : col.type === 'date' 
              ? 'text-amber-200/80 text-center' 
              : 'text-left text-zinc-200'
        }`}
      />
    </td>
  );
};

export default TableCell;
