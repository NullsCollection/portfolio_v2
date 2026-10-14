import type { ReactNode } from "react";

interface BandProps {
  id: string;
  /** Quiet section name shown in the left rail. */
  name: string;
  children: ReactNode;
  /** Extra classes on the <section>, e.g. bottom padding for the chat dock. */
  className?: string;
}

/**
 * The repeating section frame. Asymmetric — a quiet name in a sticky left
 * rail, content on the right, hairline on top. Replaces the stacked
 * all-caps eyebrow + heading every section used to have.
 * The rail collapses above the content under 860px.
 */
export function Band({ id, name, children, className = "" }: BandProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto max-w-[1080px] scroll-mt-16 px-6 max-[620px]:px-4 ${className}`}
    >
      <div className="grid grid-cols-1 gap-5 border-t border-[var(--color-border-subtle)] py-[clamp(52px,7vw,86px)] min-[860px]:grid-cols-[132px_minmax(0,1fr)] min-[860px]:gap-x-8 min-[860px]:gap-y-0">
        <h2
          id={headingId}
          className="self-start text-sm font-medium text-text-muted min-[860px]:sticky min-[860px]:top-[84px]"
        >
          {name}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
