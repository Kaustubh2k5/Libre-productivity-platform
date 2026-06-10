import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useSandboxStore } from '../store/sandboxStore';
import { useSandboxUi } from '../context/SandboxUiContext';

export default function ColumnEditorModal() {
  const { updateColumn, tables, activeTableId } = useSandboxStore();
  const { editingColumn, setEditingColumn, triggerToast } = useSandboxUi();

  const activeTable = tables.find(t => t.id === activeTableId) || tables[0];
  const col = activeTable?.columns.find(c => c.id === editingColumn?.id);

  if (!editingColumn || !col) return null;

  return (
    <AnimatePresence>
      <div id="column-editor-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setEditingColumn(null)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative bg-zinc-950 border border-white/15 w-full max-w-sm rounded-[24px] p-6 shadow-2xl overflow-hidden z-50 animate-fade-in"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-amber-500" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">
              Metric Analytics Setup
            </span>
            <button
              id="btn-close-col-editor"
              type="button"
              onClick={() => setEditingColumn(null)}
              className="p-1 rounded-md text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X size={13} />
            </button>
          </div>

          <div className="space-y-4">
            {/* Naming */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase">Variable Name</label>
              <input
                id="input-col-name"
                type="text"
                value={col.name}
                onChange={(e) => {
                  const err = updateColumn(col.id, { name: e.target.value });
                  if (err) triggerToast(err);
                }}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            {/* Variable formats */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono text-zinc-500 uppercase">Data Format</label>
              <select
                id="select-col-type"
                value={col.type}
                onChange={(e) => {
                  const err = updateColumn(col.id, { type: e.target.value as any });
                  if (err) triggerToast(err);
                }}
                className="w-full bg-neutral-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-355 font-mono focus:outline-none focus:border-red-500"
              >
                <option value="text">String / Text</option>
                <option value="number">Numeric Float (Compare analytics values)</option>
                <option value="date">Calendar Date</option>
              </select>
            </div>

            {/* Tracking checkbox */}
            {(col.type === 'number' || col.type === 'date') ? (
              <div className="p-3 bg-black/25 rounded-xl border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Track Analytics & Highlights</span>
                  <p className="text-[9.5px] text-zinc-500 font-mono">Compare variables and highlight column values</p>
                </div>
                <input
                  id="checkbox-col-tracked"
                  type="checkbox"
                  checked={col.isTracked}
                  onChange={() => {
                    const err = updateColumn(col.id, { isTracked: !col.isTracked });
                    if (err) triggerToast(err);
                  }}
                  className="w-4 h-4 rounded text-red-500 bg-transparent border-white/15 outline-none cursor-pointer focus:ring-0"
                />
              </div>
            ) : (
              <div className="bg-black/30 p-2.5 rounded-lg text-[10px] text-zinc-500 font-mono italic">
                Only numeric and date formats can be highlighted and tracked.
              </div>
            )}

            <button
              id="btn-save-col-settings"
              type="button"
              onClick={() => setEditingColumn(null)}
              className="w-full mt-2 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer block"
            >
              Save settings
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
