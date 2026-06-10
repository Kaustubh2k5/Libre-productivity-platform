import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxStore } from '../store/sandboxStore';
import { useSandboxUi } from '../context/SandboxUiContext';

export default function NewTableModal() {
  const { createTable } = useSandboxStore();
  const { showNewTableModal, setShowNewTableModal, triggerToast } = useSandboxUi();

  const [newTableName, setNewTableName] = useState('default');
  const [newTableDesc, setNewTableDesc] = useState('');

  if (!showNewTableModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTableName.trim()) return;
    const err = createTable(newTableName, newTableDesc);
    if (err) {
      triggerToast(err);
    } else {
      triggerToast(`Initialized matrix "${newTableName}"`);
    }
    setShowNewTableModal(false);
    setNewTableName('default');
    setNewTableDesc('');
  };

  return (
    <AnimatePresence>
      <div id="new-table-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowNewTableModal(false)}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative bg-zinc-950 border border-white/15 w-full max-w-md rounded-3xl p-6 shadow-2xl overflow-hidden z-50 animate-fade-in"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-red-600 to-amber-500" />
          
          <h3 className="text-base font-bold tracking-tight text-white mb-2 flex items-center gap-1.5 font-serif">
            Initialize Empty Matrix
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-widest block font-mono">Table Name</label>
              <input
                id="input-new-table-name"
                type="text"
                required
                maxLength={36}
                placeholder="e.g. Subscriber log"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[9.5px] font-bold text-zinc-400 uppercase tracking-widest block font-mono">Quick description</label>
              <input
                id="input-new-table-desc"
                type="text"
                placeholder="e.g. Observations tracker"
                value={newTableDesc}
                onChange={(e) => setNewTableDesc(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5 mt-5">
              <button
                id="btn-cancel-new-table"
                type="button"
                onClick={() => setShowNewTableModal(false)}
                className="text-xs text-zinc-400 hover:text-white bg-transparent px-3 py-2 font-mono"
              >
                Cancel
              </button>
              <button
                id="btn-submit-new-table"
                type="submit"
                className="text-xs bg-red-600 hover:bg-red-700 font-bold px-4 py-2 rounded-xl cursor-pointer text-white"
              >
                Initialize Matrix
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
