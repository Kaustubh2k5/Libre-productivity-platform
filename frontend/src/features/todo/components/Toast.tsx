import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTodo } from '../context/TodoContext';

const Toast: React.FC = () => {
  const { toastMessage } = useTodo();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          id="libre-toast-alert"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="fixed top-6 right-6 z-[2000] px-4 py-3 bg-neutral-950 text-white rounded-xl shadow-lg border border-red-500/20 flex items-center gap-2.5 text-xs font-mono"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
