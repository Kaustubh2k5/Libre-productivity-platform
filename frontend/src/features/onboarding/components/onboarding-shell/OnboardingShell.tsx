import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface OnboardingShellProps {
  children: ReactNode;
}

export default function OnboardingShell({ children }: OnboardingShellProps) {
  return (
    <div className="min-h-screen bg-[#09090B] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1F293733,transparent_45%)]" />

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
