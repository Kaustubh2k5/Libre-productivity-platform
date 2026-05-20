import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center px-10 lg:px-24">
      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-24 items-center">
        {/* Left */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 0.1 }}
            className="uppercase tracking-[0.4em] text-sm text-red-500 mb-8"
          >
            Adaptive Cognitive System
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-7xl lg:text-[8rem] leading-[0.9] tracking-tight"
          >
            Rebuild
            <br />
            your ability
            <br />
            to focus.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-10 text-lg text-white/50 max-w-xl leading-relaxed"
          >
            Libre constructs adaptive execution systems around your behavioral patterns, focus
            rhythm, and cognitive recovery.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate('/onboarding/profile')}
            className="mt-14 group flex items-center gap-4 rounded-full border border-red-900/50 bg-red-950/40 px-8 py-5 transition-all hover:border-red-700"
          >
            <span className="font-medium tracking-wide">Initialize My System</span>

            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </div>

        {/* Right */}
        <div className="relative hidden lg:flex items-center justify-center">
          <div className="relative w-[500px] h-[500px] rounded-full border border-red-900/30 bg-gradient-to-b from-red-950/40 to-black">
            <div className="absolute inset-10 rounded-full border border-red-800/20" />

            <div className="absolute inset-24 rounded-full border border-red-700/20" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-red-700/20 blur-3xl" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="font-serif text-6xl text-red-500/80">LIBRE’</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
