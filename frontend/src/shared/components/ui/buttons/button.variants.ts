import type { ButtonVariant } from './types';

export const baseStyles = `
  relative isolate overflow-hidden
  rounded-xl font-medium tracking-wide text-sm
  px-6 py-3
  flex items-center justify-center gap-2
  transition-all duration-300
`;

export const variants: Record<ButtonVariant, string> = {
  opaque: `
    bg-red-600 text-white
    hover:bg-white hover:text-black
    shadow-md
    `,

  glass: `
  border border-white/10
  text-white

  shadow-[0_8px_32px_rgba(0,0,0,0.15)]
    `,

  inverse: `
    bg-white text-black
    border border-white/30
    hover:bg-black hover:text-white
  `,
};
