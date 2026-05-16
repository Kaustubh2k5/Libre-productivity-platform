import type { ReactNode } from 'react';

export type ButtonVariant = 'opaque' | 'glass' | 'inverse';

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  showArrow?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
}
