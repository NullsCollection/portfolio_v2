import { type HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export function Card({ hover = false, className = '', children, ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-[var(--color-border)] bg-surface p-6',
        hover &&
          'transition-all duration-300 hover:border-[var(--color-border-strong)] hover:shadow-[0_0_40px_var(--color-shadow-card)]',
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
