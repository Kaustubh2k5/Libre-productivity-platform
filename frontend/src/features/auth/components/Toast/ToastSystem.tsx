import { AnimatePresence, motion } from 'framer-motion';

export function ErrorToast({ message, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          className="fixed top-6 left-1/2 -translate-x-1/2
                     bg-red-950/90 border border-red-500/30
                     text-red-100 px-4 py-3 rounded-xl
                     z-50 shadow-xl"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}