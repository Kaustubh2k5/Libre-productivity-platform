import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function OnboardingLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050000] text-white">
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full bg-red-700/20 blur-[180px]" />

        <div className="absolute bottom-[-30%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-red-900/30 blur-[220px]" />

        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Noise */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)',
        }}
      />

      {/* Top Branding */}
      <div className="absolute top-8 left-10 z-20">
        <h1 className="font-serif text-4xl tracking-tight text-white/90">LIBRE’</h1>
      </div>

      {/* Progress Indicator */}
      <div className="absolute top-10 right-10 z-20 flex items-center gap-3">
        <div className="w-16 h-[2px] bg-red-600" />
        <span className="text-xs tracking-[0.3em] uppercase text-white/40 font-medium">
          System Initialization
        </span>
      </div>

      {/* Page Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10"
      >
        <Outlet />
      </motion.div>
    </div>
  );
}
