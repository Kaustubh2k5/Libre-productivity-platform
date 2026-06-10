import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useSandboxStore } from '../../store/sandboxStore';
import { useSandboxUi } from '../../context/SandboxUiContext';
import { useActiveTable } from '../../hooks/useActiveTable';
import { useVisibleRows } from '../../hooks/useVisiblerows';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

export default function SandboxTable() {
  const {
    appendRow,
    appendColumn
  } = useSandboxStore();

  const activeTable = useActiveTable();
  const { searchFilter, triggerToast, dragResetKey } = useSandboxUi();

  const visibleRows = useVisibleRows(activeTable, searchFilter);

  if (!activeTable) return null;

  return (
    <motion.div 
      id="draggable-sandbox-table-canvas"
      key={dragResetKey}
      drag
      dragMomentum={false}
      dragElastic={0}
      dragTransition={{ power: 0, timeConstant: 0 }}
      whileDrag={{ scale: 1.005, cursor: "grabbing" }}
      className="w-fit inline-block my-4 relative overflow-visible cursor-grab active:cursor-grabbing select-none will-change-transform transform-gpu [backface-visibility:hidden]"
    >
      {/* Sleek Solid Sheet Window frame without heavy backdrop filter lag during drag, and with no scroll bars */}
      <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0c0c0e] shadow-[0_24px_60px_rgba(0,0,0,0.8)] relative overflow-visible">
        <table className="border-collapse bg-transparent table-auto min-w-full relative">
          <TableHeader />

          <tbody className="divide-y divide-white/10 text-xs text-zinc-300 font-mono">
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={activeTable.columns.length + 1} className="p-10 text-center text-zinc-500 bg-black/10 italic">
                   Grid is empty. Tick the "Add Row" button beneath to append observations.
                </td>
              </tr>
            ) : (
              visibleRows.map((row, rIdx) => (
                <TableRow 
                  key={row.id as string} 
                  row={row} 
                  rIdx={rIdx} 
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* END OF TABLE TAIL ACTIONS */}
      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
             id="btn-append-row"
            onClick={() => {
              const err = appendRow();
              if (err) {
                triggerToast(err);
              } else {
                triggerToast("Appended row underneath");
              }
            }}
            disabled={activeTable.rows.length >= 10}
            className={`px-3.5 py-1.5 border rounded-xl text-[11px] font-mono transition-all flex items-center gap-1.5 ${
              activeTable.rows.length >= 10
                ? 'bg-zinc-950 text-zinc-600 border-zinc-800/50 cursor-not-allowed opacity-50'
                : 'bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white cursor-pointer'
            }`}
            title={activeTable.rows.length >= 10 ? "Limit reached: Maximum 10 rows configured" : "Append a new row"}
          >
            <Plus size={10} />
            <span>Add Row (Max 10)</span>
          </button>
          <button
             id="btn-append-col"
            onClick={() => {
              const err = appendColumn();
              if (err) {
                triggerToast(err);
              } else {
                triggerToast("Appended column at the end");
              }
            }}
            disabled={activeTable.columns.length >= 5}
            className={`px-3.5 py-1.5 border rounded-xl text-[11px] font-mono transition-all flex items-center gap-1.5 ${
              activeTable.columns.length >= 5
                ? 'bg-zinc-555 text-zinc-600 border-zinc-800/50 cursor-not-allowed opacity-50'
                : 'bg-white/[0.03] hover:bg-white/[0.08] active:scale-95 border-white/10 hover:border-white/20 text-zinc-300 hover:text-white cursor-pointer'
            }`}
            title={activeTable.columns.length >= 5 ? "Limit reached: Maximum 5 columns configured" : "Append a new column"}
          >
            <Plus size={10} />
            <span>Add Col (Max 5)</span>
          </button>
        </div>
        <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
          Cols: <strong className={activeTable.columns.length >= 5 ? "text-red-400 font-bold" : "text-zinc-300"}>{activeTable.columns.length}/5</strong> | Rows: <strong className={activeTable.rows.length >= 10 ? "text-red-400 font-bold" : "text-zinc-300"}>{activeTable.rows.length}/10</strong>
        </span>
      </div>
    </motion.div>
  );
}
