import { type HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'tag';
}

export function Badge({ variant = 'default', className = '', children, ...props }: BadgeProps) {
  const base =
    'inline-flex items-center rounded-full text-xs font-medium px-2.5 py-1 leading-none';

  const variants = {
    default: 'bg-white/5 text-white/60 border border-white/10',
    tag: 'bg-tertiary/10 text-tertiary',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
