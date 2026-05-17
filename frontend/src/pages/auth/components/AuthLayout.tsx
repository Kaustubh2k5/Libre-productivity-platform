import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import libreLogo from '../../../assets/libre.svg';
interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen md:h-screen flex flex-col md:flex-row bg-black overflow-x-hidden">
      {/* Left Side: Form Area (Fixed on Desktop, Scrollable if needed) */}
      <div className="md:flex-[0.8] flex flex-col items-center justify-start md:justify-center p-8 pt-20 pb-16 md:p-16 relative shrink-0 bg-black overflow-y-auto scrollbar-none">
        {/* Mobile-only Background Gradients */}
        <div className="absolute inset-0 md:hidden pointer-events-none z-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[120%] bg-[radial-gradient(circle_at_top,rgba(230,0,0,0.45)_0%,transparent_75%)] opacity-70" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[100%] bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.06)_0%,transparent_70%)] opacity-50" />
        </div>

        {/* Mobile Return to Home */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full max-w-md z-10 mt-12 md:mt-10"
        >
          <div className="mb-14 text-center md:text-left">
            <h1 className="text-4xl md:text-[3.5rem] font-serif tracking-tight mb-3 uppercase leading-[1.1]">
              {title}
            </h1>
            {subtitle && (
              <p className="text-white/40 text-lg tracking-wide font-light max-w-sm mx-auto md:mx-0">
                {subtitle}
              </p>
            )}
          </div>

          <div className="relative">{children}</div>

          <div className="mt-14 md:mt-20 text-center md:text-left">
            <Link
              to="/"
              className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 hover:text-white/40 transition-colors"
            >
              Return to home
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Visual/Branding Area (Scrollable within Curved Panel) */}
      <div className="hidden md:flex md:flex-[1.3] relative bg-black p-4 lg:p-5 overflow-hidden">
        <div className="w-full h-full relative bg-black rounded-[3rem] lg:rounded-[4rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)]">
          {/* Internal Gradient Bloom - High Intensity Top Center - FIXED BACKGROUND */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[160%] h-[120%] bg-[radial-gradient(circle_at_top,rgba(230,0,0,0.7)_0%,rgba(180,0,0,0.5)_20%,rgba(80,0,0,0.2)_40%,rgba(0,0,0,0)_60%)] pointer-events-none opacity-100 z-0" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[70%] bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.05)_30%,rgba(0,0,0,0)_50%)] pointer-events-none z-0" />

          <div
            id="scroll-container"
            className="w-full h-full relative overflow-y-auto overflow-x-hidden scrollbar-none snap-y snap-mandatory z-10"
          >
            <div className="w-full flex flex-col items-center">
              {/* Main Content: Get Started */}
              <div className="w-full min-h-screen flex flex-col items-center p-12 pt-44 pb-24 snap-start">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="flex flex-col items-center text-center w-full max-w-md"
                >
                  {/* Logo Placeholder */}
                  <img
                    src={libreLogo}
                    alt="Libre Logo"
                    className="w-40 h-40 mb-10 opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <h2 className="text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight whitespace-nowrap">
                    Get Started with Us
                  </h2>
                  <p className="text-white/30 text-sm mb-16 font-light leading-relaxed max-w-[320px]">
                    Complete these brief steps to register your account and secure your cognitive
                    assets.
                  </p>

                  {/* Steps List */}
                  <div className="w-full space-y-2 max-w-[340px]">
                    {[
                      { id: 1, label: 'REGISTER', active: true },
                      { id: 2, label: 'USER ONBOARDING', active: false },
                      { id: 3, label: 'SETUP PROFILE', active: false },
                    ].map((step) => (
                      <div
                        key={step.id}
                        className={`flex items-center gap-3 p-3.5 rounded-[1.25rem] border transition-all duration-700 ${
                          step.active
                            ? 'bg-white text-black border-white shadow-[0_20px_60px_rgba(255,255,255,0.12)] scale-[1.02]'
                            : 'bg-white/[0.02] text-white/40 border-white/[0.03]'
                        }`}
                      >
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${
                            step.active ? 'bg-black text-white' : 'bg-white/10 text-white/40'
                          }`}
                        >
                          {step.id}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Privacy Section Indicator */}
                  <div
                    className="mt-12 flex flex-col items-center gap-5 cursor-pointer group"
                    onClick={() => {
                      document
                        .getElementById('privacy-section')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/20 transition-colors text-center text-balance">
                      how we ensure your privacy
                    </span>
                    <motion.div
                      whileHover={{ y: 8, boxShadow: '0 0 30px rgba(255,255,255,0.25)' }}
                      className="w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 backdrop-blur-xl bg-white/[0.03]"
                    >
                      <span className="text-xl">↓</span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Section 2: Privacy Policy */}
              <div
                id="privacy-section"
                className="w-full min-h-screen flex flex-col items-center justify-center p-20 py-32 relative snap-start"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="text-center max-w-lg z-20"
                >
                  <h3 className="text-6xl font-serif mb-12 leading-[1.1] tracking-tight whitespace-nowrap">
                    Privacy Policy
                  </h3>
                  <p className="text-white/30 text-lg leading-relaxed mb-10 font-light max-w-md mx-auto">
                    We value your privacy, and ensure that it is completely secure. To know more,
                    read our{' '}
                    <Link to="#" className="text-[#e60000] hover:text-[#ff1a1a] transition-colors">
                      blog
                    </Link>
                    .
                  </p>

                  <p className="text-white/10 text-sm font-light">
                    You can also see our{' '}
                    <Link to="#" className="text-white/20 hover:text-white transition-colors">
                      privacy policy
                    </Link>
                  </p>
                </motion.div>

                <div
                  onClick={() => {
                    document
                      .getElementById('scroll-container')
                      ?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-28 group flex flex-col items-center gap-5 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ y: -8, boxShadow: '0 0 30px rgba(255,255,255,0.2)' }}
                    className="w-14 h-14 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 bg-white/[0.03]"
                  >
                    <span className="text-xl">↑</span>
                  </motion.div>
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10 transition-colors">
                    Back to top
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
