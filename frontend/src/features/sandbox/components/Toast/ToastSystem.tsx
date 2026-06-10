import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxUi } from '../../context/SandboxUiContext';

export default function ToastSystem() {
  const { toastMessage } = useSandboxUi();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          id="sandbox-toast"
          initial={{ opacity: 0, y: -16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 bg-zinc-950/90 border border-white/10 backdrop-blur-md px-4 py-2.5 rounded-xl text-xs font-sans text-neutral-200 z-50 shadow-xl flex items-center gap-2 select-none"
        >
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
