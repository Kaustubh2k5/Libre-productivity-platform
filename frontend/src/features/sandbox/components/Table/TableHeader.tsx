import React from 'react';
import { Hash, Calendar, Type, Edit2, Trash2, Plus } from 'lucide-react';
import { useSandboxStore } from '../../store/sandboxStore';
import { useSandboxUi } from '../../context/SandboxUiContext';
import { useActiveTable } from '../../hooks/useActiveTable';

export default function TableHeader() {
  const {
    updateColumn,
    deleteColumn,
    insertColumnBeside
  } = useSandboxStore();

  const activeTable = useActiveTable();
  const { triggerToast, setEditingColumn } = useSandboxUi();

  if (!activeTable) return null;

  return (
    <thead>
      <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] tracking-wider text-zinc-400 font-mono uppercase overflow-visible">
        {/* Clean Row Index Header */}
        <th className="p-3.5 w-12 text-center text-zinc-500 bg-black/40 border-r border-white/10 font-mono text-[10px] font-extrabold overflow-visible select-none">
          #
        </th>
        
        {activeTable.columns.map((col) => (
          <th 
            key={col.id}
            onDoubleClick={(e) => {
              e.stopPropagation();
              if (col.type === 'number' || col.type === 'date') {
                const nextState = !col.isTracked;
                const err = updateColumn(col.id, { isTracked: nextState });
                if (err) {
                  triggerToast(err);
                } else {
                  triggerToast(nextState ? "Column tracking active" : "Column tracking inactive");
                }
              } else {
                triggerToast("Tracking is only supported for numeric or date columns");
              }
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className={`p-4 relative group/col select-none border-r border-white/10 last:border-0 transition-all overflow-visible ${
              col.isTracked ? 'bg-red-500/[0.03] text-red-300' : 'hover:bg-white/[0.01]'
            }`}
            style={{ minWidth: col.type === 'date' ? '195px' : col.type === 'text' ? '185px' : '150px' }}
          >
            <div className="flex items-center justify-between gap-1 overflow-visible">
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                {col.type === 'number' && <Hash size={10} className="text-red-400" />}
                {col.type === 'date' && <Calendar size={11} className="text-amber-400" />}
                {col.type === 'text' && <Type size={11} className="text-blue-400" />}
                
                <span 
                  className={`font-semibold truncate uppercase tracking-wider text-[11px] cursor-pointer ${
                    col.isTracked ? 'text-red-400 font-black' : 'text-zinc-300 hover:text-white'
                  }`}
                  title="Double-click to toggle dynamic tracking"
                >
                  {col.name}
                </span>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                {/* Hover action to configure column settings */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingColumn(col);
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="opacity-100 md:opacity-0 md:group-hover/col:opacity-100 transition-all p-1 bg-neutral-950/90 hover:bg-neutral-800 border border-white/10 text-zinc-400 hover:text-white rounded cursor-pointer"
                  title="Edit variable configuration"
                >
                  <Edit2 size={11} />
                </button>

                {/* Hover action to delete column directly */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const err = deleteColumn(col.id);
                    if (err) {
                      triggerToast(err);
                    } else {
                      triggerToast("Column deleted");
                    }
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="opacity-100 md:opacity-0 md:group-hover/col:opacity-100 transition-all p-1 bg-neutral-950/90 hover:bg-red-500/20 border border-white/10 text-zinc-400 hover:text-red-400 rounded cursor-pointer"
                  title="Delete column"
                >
                  <Trash2 size={11} />
                </button>
              </div>
            </div>

            {/* --- EXPANSIVE BOUNDARY DRILL HOVER: COLUMN SIDEBAR TRIGGER BESIDE --- */}
            <div 
              onClick={(e) => {
                e.stopPropagation();
                const err = insertColumnBeside(col.id);
                if (err) {
                  triggerToast(err);
                } else {
                  triggerToast("Created column to the right");
                }
              }}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute -right-2 top-0 bottom-0 w-4 bg-transparent cursor-col-resize z-[100] hover:z-[110] flex items-center justify-center opacity-0 group-hover/col:opacity-100 transition-all"
              title="Create dynamic variable beside"
            >
              <div className="bg-red-600 hover:bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md hover:scale-115 cursor-pointer border border-white/15 active:scale-95 transition-all duration-150 relative z-10">
                <Plus size={9} strokeWidth={3.5} />
              </div>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
