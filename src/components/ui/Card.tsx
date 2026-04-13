import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-white/10 bg-surface p-6',
        hover &&
          'transition-all duration-300 hover:border-white/20 hover:shadow-[0_0_40px_rgba(79,70,229,0.07)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}
