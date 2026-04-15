import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react';

type BaseProps = {
  variant?: 'primary' | 'ghost';
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const base =
  'inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary:
    'bg-secondary text-white hover:bg-[var(--color-accent-hover)] focus-visible:ring-secondary',
  ghost:
    'border border-[var(--color-border-strong)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-surface)] focus-visible:ring-[var(--color-border-strong)]',
};

export function Button({ variant = 'primary', className = '', children, ...props }: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (props.as === 'a') {
    const { as: _as, ...anchorProps } = props;
    return (
      <a className={classes} {...(anchorProps as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  const { as: _as, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
