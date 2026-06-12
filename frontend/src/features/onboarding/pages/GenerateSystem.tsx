import { motion } from 'framer-motion';
import { buildOnboardingSubmissionPayload, useOnboardingStore } from '../store/onBoardingStore';

export default function GenerateSystem() {
  const profile = useOnboardingStore((state) => state.profile);
  const assessment = useOnboardingStore((state) => state.assessment);
  const submissionPayload = buildOnboardingSubmissionPayload(profile, assessment);

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

        <pre className="mt-10 max-h-72 overflow-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-left text-xs leading-relaxed text-zinc-300">
          {JSON.stringify(submissionPayload, null, 2)}
        </pre>
      </div>
    </div>
  );
}
