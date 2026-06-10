import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSandboxUi } from '../../context/SandboxUiContext';

export default function FloatingActions() {
  const { 
    setCarouselIndex, 
    setShowHelpCarousel, 
    showHelpTooltip, 
    setShowHelpTooltip 
  } = useSandboxUi();

  return (
    <div id="sandbox-floating-actions" className="relative shrink-0 select-none">
      <button
        id="btn-trigger-help-carousel"
        onClick={() => {
          setCarouselIndex(0);
          setShowHelpCarousel(true);
          setShowHelpTooltip(false);
        }}
        className="w-7 h-7 rounded-lg bg-white/[0.04] hover:bg-white/[0.09] text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 transition-all duration-150 cursor-pointer flex items-center justify-center text-xs font-bold leading-none select-none hover:scale-105 active:scale-95"
        title="Interactive Feature Guide & Matrix Tour"
      >
        ?
      </button>

      {/* FLOATING DIALOGUE/TOOLTIP WITH ENHANCED GRAPHICS */}
      <AnimatePresence>
        {showHelpTooltip && (
          <motion.div
            id="guide-speech-bubble"
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: "spring", damping: 15, stiffness: 180 }}
            onClick={() => {
              setCarouselIndex(0);
              setShowHelpCarousel(true);
              setShowHelpTooltip(false);
            }}
            className="absolute right-0 top-full mt-2 w-52 md:w-56 bg-zinc-950 border border-white/20 shadow-[0_12px_45px_rgba(0,0,0,0.95)] rounded-xl p-3 z-[100] text-left select-none cursor-pointer"
            style={{ opacity: 1 }}
          >
            {/* Speech bubble arrow pointing up */}
            <div 
              className="absolute right-2 -top-1 w-2.5 h-2.5 border-l border-t border-white/20 transform rotate-45 bg-zinc-950"
            />

            <div className="relative flex flex-col gap-1 z-10">
              <div className="flex items-start justify-between gap-1">
                <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest font-mono">
                  Quick Guide
                </p>
                <button
                  id="btn-close-tooltip"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHelpTooltip(false);
                  }}
                  className="text-zinc-400 hover:text-white text-[11px] font-bold hover:scale-110 active:scale-95 transition-transform p-0.5"
                  title="Dismiss"
                >
                  ×
                </button>
              </div>
              <p className="text-[11.5px] text-white leading-snug font-sans font-medium">
                Hey, click here to see how this works!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
