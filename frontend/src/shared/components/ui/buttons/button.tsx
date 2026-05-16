import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { ButtonProps } from './types';
import { baseStyles, variants } from './button.variants';

export const Button = ({
  children,
  className = '',
  showArrow = false,
  variant = 'opaque',
}: ButtonProps) => {
  const isGlass = variant === 'glass';

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`
        ${baseStyles}
        ${variants[variant]}
        relative isolate overflow-hidden
        ${className}
      `}
    >
      {isGlass && (
        <div className="absolute inset-0 rounded-xl z-0 overflow-hidden pointer-events-none">
          {/*Subtle base blur */}
          <div className="absolute inset-0 backdrop-blur-[1px]" />

          {/* Edge distortion */}
          <div
            className="absolute top-0 left-0 w-full h-2"
            style={{ backdropFilter: 'url(#glass-distortion)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-2"
            style={{ backdropFilter: 'url(#glass-distortion)' }}
          />
          <div
            className="absolute left-0 top-0 h-full w-2"
            style={{ backdropFilter: 'url(#glass-distortion)' }}
          />
          <div
            className="absolute right-0 top-0 h-full w-2"
            style={{ backdropFilter: 'url(#glass-distortion)' }}
          />
        </div>
      )}

      {isGlass && (
        <div className="absolute inset-0 rounded-xl z-10 pointer-events-none bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-40" />
      )}

      {/* Content */}
      <span className="relative z-20 flex items-center gap-2">
        {children}
        {showArrow && (
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        )}
      </span>
    </motion.button>
  );
};
