import React from 'react';
import { motion } from 'framer-motion';
import { Table as TableIcon } from 'lucide-react';
import { useSandboxStore } from '../../store/sandboxStore';
import { useSandboxUi } from '../../context/SandboxUiContext';

export default function EmptyState() {
  const { createTable } = useSandboxStore();
  const { triggerToast } = useSandboxUi();

  const handleInitDefault = () => {
    createTable('default', 'Default matrix sheet.');
    triggerToast("Initialized default matrix");
  };

  return (
    <div id="sandbox-empty-state" className="h-full w-full flex flex-col items-center justify-center p-12 select-none">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-neutral-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl relative"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-amber-500 rounded-t-3xl" />
        <div className="w-12 h-12 rounded-full bg-neutral-950 flex items-center justify-center mx-auto mb-5 border border-white/5 text-zinc-500">
          <TableIcon size={20} />
        </div>
        <h2 className="text-sm font-bold font-mono tracking-wider text-white uppercase mb-2">
          No active matrices
        </h2>
        <p className="text-[11px] text-zinc-500 font-mono leading-relaxed mb-6">
          Create a sandbox matrix from the toolbar or initialize a fresh default sheet to start charting goals.
        </p>
        
        <button
          id="btn-create-default-table"
          onClick={handleInitDefault}
          className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-lg active:scale-95"
        >
          Create Default Table
        </button>
      </motion.div>
    </div>
  );
}
