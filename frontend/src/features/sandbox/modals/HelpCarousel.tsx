import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSandboxStore } from '../store/sandboxStore';
const dragonImage = new URL('../../../assets/libre.svg', import.meta.url).href;
export default function HelpCarousel() {
  const {
    showHelpCarousel,
    setShowHelpCarousel,
    carouselIndex,
    setCarouselIndex
  } = useSandboxStore();

  if (!showHelpCarousel) return null;

  return (
    <AnimatePresence>
      <div id="help-carousel-modal" className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
        {/* Backdrop blur overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowHelpCarousel(false)}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Carousel Dialog Shell */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          className="relative w-full max-w-md sm:max-w-lg md:max-w-2xl rounded-[24px] overflow-hidden shadow-2xl border border-white/10 bg-[#09090c] flex flex-col justify-between min-h-[340px] md:min-h-[420px]"
        >
          {/* Dragon Background Layer */}
          <div 
            className="absolute inset-0 bg-cover mix-blend-screen pointer-events-none"
            style={{ 
              backgroundImage: `url(${dragonImage})`,
              backgroundPosition: `${50 + (carouselIndex * 15)}% center`,
              opacity: 0.45,
              transition: 'background-position 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-neutral-900/95 to-neutral-950/100 pointer-events-none" />

          {/* Content Content Wrapper Column */}
          <div className="relative p-6 md:p-9 flex-1 flex flex-col justify-between z-10 select-none">
            {/* Header Title with X Close Trigger with discrete counter */}
            <div className="flex items-center justify-between gap-2.5 pb-3 mb-3 border-b border-white/5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs md:text-sm font-mono text-zinc-400 font-semibold tracking-wider">
                  Help Guide <span className="text-zinc-650">•</span> {carouselIndex + 1}/4
                </span>
              </div>
              <button
                id="btn-close-help-carousel"
                onClick={() => setShowHelpCarousel(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Slides Visual Frame with Slide Info */}
            <div className="flex-1 py-4 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3.5 md:space-y-5 min-h-[145px] md:min-h-[180px]"
                >
                  <h4 className="text-sm md:text-lg font-bold text-white tracking-tight flex items-center gap-2 font-mono">
                    {carouselIndex === 0 && <span className="text-red-410 font-serif font-black">❖</span>}
                    {carouselIndex === 1 && <span className="text-amber-400 font-serif font-black">✦</span>}
                    {carouselIndex === 2 && <span className="text-blue-400 font-serif font-black">❈</span>}
                    {carouselIndex === 3 && <span className="text-emerald-400 font-serif font-black">✺</span>}
                    {carouselIndex === 0 && "Interactive Grid Canvas"}
                    {carouselIndex === 1 && "Multivariant Variables"}
                    {carouselIndex === 2 && "Dynamic Analytics Monitoring"}
                    {carouselIndex === 3 && "Modular Template Presets"}
                  </h4>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans font-medium">
                    {carouselIndex === 0 && "Grab, swipe, or drag the table across the dark blueprint environment. Double-tap to focus cells, or hit the 'Move' icon to instantly zoom back onto target coordinates."}
                    {carouselIndex === 1 && "Customize variables across Text format strings, Numeric metrics, and Calendar Deadlines. Double-click any column header to lock in trackable indicators."}
                    {carouselIndex === 2 && "Use the Presets button to instantly load zero-effort schema skeletons pre-configured for goal Milestones, Numeric Progress values, or Event Message Logging."}
                    {carouselIndex === 3 && "Create up to 2 distinct sandbox sheets, update observations, or perform automatic analytics. Safe-states sync automatically to local storage with quick save controls."}
                  </p>
                  <div className="pt-2">
                    <span className="text-[9.5px] md:text-xs uppercase font-mono bg-white/[0.03] text-zinc-500 tracking-wider px-2 md:px-3 py-1 md:py-1.5 rounded border border-white/5 font-semibold">
                      {carouselIndex === 0 && "DRAGGABLE CANVAS"}
                      {carouselIndex === 1 && "MULTIVARIATE COLUMNS"}
                      {carouselIndex === 2 && "MODULAR SCHEMAS"}
                      {carouselIndex === 3 && "LOCAL STORAGE SYNC"}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Navigation with Dots and Controls */}
            <div className="flex items-center justify-between pt-4.5 mt-3 border-t border-white/5">
              {/* Indicators dots spacer */}
              <div className="flex items-center gap-1.5">
                {[0, 1, 2, 3].map((dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCarouselIndex(dotIdx)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 cursor-pointer ${
                      dotIdx === carouselIndex 
                        ? 'bg-red-500 w-4' 
                        : 'bg-white/15 hover:bg-white/30'
                    }`}
                    title={`Slide ${dotIdx + 1}`}
                  />
                ))}
              </div>

              {/* Previous Next Navigation */}
              <div className="flex items-center gap-1.5">
                <button
                  id="btn-carousel-back"
                  onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))}
                  disabled={carouselIndex === 0}
                  className={`p-1.5 rounded-xl border border-white/5 transition-all flex items-center justify-center ${
                    carouselIndex === 0 
                      ? 'bg-neutral-900 text-zinc-650 opacity-40 cursor-not-allowed animate-none'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white cursor-pointer'
                  }`}
                >
                  <ChevronLeft size={14} />
                </button>
                {carouselIndex < 3 ? (
                  <button
                    id="btn-carousel-next"
                    onClick={() => setCarouselIndex(prev => Math.min(3, prev + 1))}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                  >
                    <span>Next</span>
                    <ChevronRight size={12} />
                  </button>
                ) : (
                  <button
                    id="btn-carousel-close"
                    onClick={() => setShowHelpCarousel(false)}
                    className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-mono font-bold transition-all cursor-pointer active:scale-95"
                  >
                    Close
                  </button>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
