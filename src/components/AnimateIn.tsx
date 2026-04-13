'use client';

import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Direction to animate from. Defaults to 'up'. */
  from?: 'up' | 'down' | 'left' | 'none';
}

const OFFSET = 22;

const directionMap: Record<NonNullable<AnimateInProps['from']>, { x?: number; y?: number }> = {
  up: { y: OFFSET },
  down: { y: -OFFSET },
  left: { x: OFFSET },
  none: {},
};

export function AnimateIn({ children, delay = 0, className, from = 'up' }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-64px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[from] }}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, ...directionMap[from] }
      }
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
