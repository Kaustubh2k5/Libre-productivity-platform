import { LibreNavbar } from '../../features/landing/components/navbar';
import { Button } from '../../shared/components/ui/buttons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <LibreNavbar />

      <main className="pt-48 pb-32 px-8 flex flex-col items-center">
        {/* Hero Section */}
        <section className="max-w-4xl w-full text-center mb-40">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-serif uppercase tracking-tight text-white/40 mb-6"
          >
            Welcome to
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-7xl md:text-[140px] font-serif uppercase tracking-tighter leading-none mb-4 text-[#e60000] drop-shadow-[0_0_80px_rgba(230,0,0,0.3)]"
          >
            LIBRE'
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-3xl md:text-5xl font-serif tracking-tight mb-8"
          >
            A Platform to rebuild your ability to focus
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-white/40 text-[14px] md:text-[16px] font-medium max-w-2xl mx-auto mb-10 tracking-wide"
          >
            A productivity platform that grows and strategizes alongside you. <br />
            Engineered for high-velocity creation and deep psychological flow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button variant="glass">
              {' '}
              <Link to="/auth">Explore Libre'</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20"
          >
            v0.0.0
          </motion.div>
        </section>

        {/* Feature Sections - Unboxed */}
        <section className="w-full max-w-6xl mb-40 flex flex-col gap-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
          >
            <div className="md:col-span-7 space-y-8">
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-red-600">
                Our Goal
              </h3>
              <h4 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">
                Genuinely add value to your daily life.
              </h4>
              <p className="text-white/50 text-xl leading-relaxed max-w-xl">
                We help you be more focused and less overburdened. Every interaction is designed to
                diminish friction and amplify human potential.
              </p>
            </div>
            <div className="md:col-span-5 h-[400px] flex items-center justify-center relative">
              {/* Deep Background Bloom */}
              <div className="absolute w-64 h-64 bg-white/10 blur-[120px] rounded-full" />

              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 flex items-center justify-center"
              >
                {/* The User's SVG with seamless glow */}
                <img
                  src="src/assets/View.svg"
                  alt="Libre Logo"
                  className="w-48 h-48 drop-shadow-[0_0_50px_rgba(255,255,255,0.6)] object-contain"
                  onError={(e) => {
                    // Fallback if logo.svg isn't found yet
                    (e.target as HTMLImageElement).style.opacity = '0.5';
                  }}
                />

                {/* Secondary Seamless Glow Layer */}
                <div className="absolute inset-0 w-40 h-40 bg-white/20 blur-[60px] rounded-full -z-10" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
          >
            <div className="md:order-2 md:col-span-7 space-y-8">
              <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-red-600">
                AI Agents
              </h3>
              <h4 className="text-5xl md:text-7xl font-serif leading-[1.1] tracking-tight">
                Adaptive agentic workflows.
              </h4>
              <p className="text-white/50 text-xl leading-relaxed max-w-xl">
                We use agentic intelligence to plan and reinvent daily workflows to be more
                efficient, evolving with your needs.
              </p>
            </div>
            <div className="md:order-1 md:col-span-5 h-[400px] flex items-center justify-center relative">
              {/* Red Background Glow */}
              <div className="absolute w-64 h-64 bg-red-600/10 blur-[120px] rounded-full" />

              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10 flex items-center justify-center"
              >
                {/* The Agents SVG with seamless red glow */}
                <img
                  src="src/assets/brain_02.svg"
                  alt="Agents Logo"
                  className="w-48 h-48 drop-shadow-[0_0_50px_rgba(230,0,0,0.4)] object-contain"
                  onError={(e) => {
                    // Fallback
                    (e.target as HTMLImageElement).style.opacity = '0.5';
                  }}
                />

                {/* Secondary Seamless Glow Layer */}
                <div className="absolute inset-0 w-40 h-40 bg-red-600/20 blur-[60px] rounded-full -z-10" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-3xl mx-auto space-y-12"
          >
            <div className="h-px w-24 bg-red-600 mx-auto" />
            <h3 className="text-3xl md:text-4xl font-serif leading-relaxed text-white/90">
              We are not just a productivity app. Think of Libre' as an agentic teammate that you
              can plan alongside with, that can reason and understand your preferences and working
              habits.
            </h3>
            <div className="h-px w-24 bg-red-600 mx-auto" />
          </motion.div>
        </section>

        {/* Manifesto Section - Unboxed */}
        <section className="w-full max-w-4xl mb-40 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="text-[12px] font-black uppercase tracking-[1em] text-[#e60000] mb-12"></div>

            <h2 className="text-5xl md:text-8xl font-serif uppercase tracking-tighter leading-[1.1] mb-12">
              Attention is the true <br /> <span className="text-red-600">Cognitive Liberty.</span>
            </h2>

            <p className="text-white/40 text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto mb-16">
              "Reclaim your right to deep work. Reclaim your right to thought. Reclaim your right to
              freedom."
            </p>

            <div className="flex justify-center">
              <Button variant="glass">Read the Literature</Button>
            </div>
          </motion.div>
        </section>

        {/* Closing Footer Space */}
        <footer className="w-full max-w-6xl py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 text-white/20">
          <div className="flex items-center gap-4">
            <span className="font-medium tracking-tight text-white/40">By the Libre' Devteam</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em]">
            <a href="#" className="hover:text-[#e60000] transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-[#e60000] transition-colors">
              Github
            </a>
          </div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em]">#$5^12</div>
        </footer>
      </main>
    </div>
  );
};
