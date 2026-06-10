import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxUi } from '../context/SandboxUiContext';

export default function ConfirmDialog() {
  const { confirmDialog, setConfirmDialog } = useSandboxUi();

  if (!confirmDialog || !confirmDialog.isOpen) return null;

  return (
    <AnimatePresence>
      <div id="confirm-dialog-modal" className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setConfirmDialog(null)}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        />

        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative bg-zinc-950 border border-white/15 w-full max-w-sm rounded-[24px] p-6 shadow-2xl overflow-hidden z-50 animate-fade-in"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-amber-500" />
          
          <h3 className="text-sm font-bold tracking-tight text-white mb-2 flex items-center gap-1.5 font-mono uppercase">
            ⚠️ Confirm Action
          </h3>
          
          <p className="text-xs text-zinc-400 font-mono leading-relaxed mt-3 mb-6">
            {confirmDialog.message}
          </p>

          <div className="flex items-center justify-end gap-3 font-mono">
            <button
              id="btn-confirm-cancel"
              type="button"
              onClick={() => setConfirmDialog(null)}
              className="px-3.5 py-2 hover:bg-white/5 border border-white/10 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              id="btn-confirm-execute"
              type="button"
              onClick={() => {
                confirmDialog.onConfirm();
                setConfirmDialog(null);
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Discard
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
