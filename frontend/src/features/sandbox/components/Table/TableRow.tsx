import React, { FC } from 'react';
import { Trash2, Plus } from 'lucide-react';
import { useSandboxStore } from '../../store/sandboxStore';
import { useSandboxUi } from '../../context/SandboxUiContext';
import { useActiveTable } from '../../hooks/useActiveTable';
import TableCell from './TableCell';

interface TableRowProps {
  row: Record<string, string | number>;
  rIdx: number;
}

const TableRow: FC<TableRowProps> = ({ row, rIdx }) => {
  const {
    deleteRow,
    insertRowBelow
  } = useSandboxStore();

  const activeTable = useActiveTable();
  const { triggerToast } = useSandboxUi();

  if (!activeTable) return null;

  return (
    <tr 
      className="group/row border-b border-white/[0.05] last:border-0 hover:bg-white/[0.01] transition-colors relative overflow-visible"
    >
      {/* Left Block Row Index with discard trigger */}
      <td 
        onPointerDown={(e) => e.stopPropagation()}
        className="p-3 w-12 text-center relative bg-black/30 text-[10px] text-zinc-650 font-semibold group-hover/row:text-zinc-400 transition-colors overflow-visible border-r border-white/10"
      >
        <div className="flex items-center justify-center h-full">
          <span className="hidden md:block md:group-hover/row:hidden transition-all">{rIdx + 1}</span>
          
          <button
            id={`btn-delete-row-${row.id}`}
            onClick={(e) => {
              e.stopPropagation();
              const err = deleteRow(row.id as string);
              if (err) {
                triggerToast(err);
              } else {
                triggerToast("Row discarded");
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="block md:hidden md:group-hover/row:block text-zinc-500 hover:text-red-400 transition-colors p-0.5 cursor-pointer"
            title="Discard row"
          >
            <Trash2 size={11} />
          </button>
        </div>

        {/* --- EXPANSIVE BOUNDARY DRILL HOVER: ROW BOTTOM TRIGGER UNDERNEATH --- */}
        <div 
          onClick={(e) => {
            e.stopPropagation();
            const err = insertRowBelow(row.id as string);
            if (err) {
              triggerToast(err);
            } else {
              triggerToast("Inserted row below");
            }
          }}
          onPointerDown={(e) => e.stopPropagation()}
          className="absolute -bottom-2.5 left-0 right-0 h-5 bg-transparent cursor-row-resize z-[100] hover:z-[110] flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity"
          title="Insert row below"
        >
          <div className="bg-red-600 hover:bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:scale-115 cursor-pointer border border-white/15 active:scale-95 transition-all duration-150 relative z-10">
            <Plus size={9} strokeWidth={3.5} />
          </div>
        </div>
      </td>

      {activeTable.columns.map((col) => (
        <TableCell 
          key={col.id} 
          row={row} 
          col={col} 
        />
      ))}
    </tr>
  );
};

export default TableRow;
