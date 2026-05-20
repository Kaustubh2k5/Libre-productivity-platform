import { motion } from 'framer-motion';
export default function GenerateSystem() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-24 h-24 rounded-full border border-white/20 border-twhite mx-auto mb-10"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-5xl font-semibold mb-6"
        >
          Building your adaptive system
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-zinc-400 text-lg leading-relaxed"
        >
          Analyzing behavioral patterns, energy rhythms, focus depth,execution tendencies, and
          workflow architecture.
        </motion.p>
      </div>
    </div>
  );
}
