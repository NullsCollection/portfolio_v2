import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { shipped, type ShippedItem } from "@/data/shipped";

/** "2026-10" → "2026·10" */
const formatDate = (date: string) => date.replace("-", "·");

const isExternal = (href: string) => /^https?:\/\//.test(href);

/** ↗ leaves the site, ↓ stays on the page, → goes to another page. */
function arrowFor(href: string) {
  if (isExternal(href)) return "↗";
  if (href.startsWith("#")) return "↓";
  return "→";
}

const ROW =
  "grid grid-cols-[58px_1fr_auto] items-baseline gap-3 py-[11px]";

function RowBody({ item }: { item: ShippedItem }) {
  return (
    <>
      <time
        dateTime={item.date}
        className="font-mono text-xs text-text-muted"
      >
        {formatDate(item.date)}
      </time>
      <span className="text-pretty text-[13.5px] leading-normal text-text-muted">
        <b className="mr-1.5 font-medium text-text-primary">{item.name}</b>
        {item.blurb}
      </span>
      <span
        aria-hidden="true"
        className="font-mono text-xs text-text-muted transition-colors group-hover:text-[var(--color-text-accent)]"
      >
        {item.href ? arrowFor(item.href) : ""}
      </span>
    </>
  );
}

/** Wraps children in the right kind of link, or nothing if there's no href. */
function MaybeLink({
  href,
  className,
  children,
}: {
  href?: string;
  className: string;
  children: ReactNode;
}) {
  if (!href) return <div className={className}>{children}</div>;
  if (isExternal(href)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/**
 * Hero proof card: the newest ship leads with a screenshot so the column has
 * visual weight, the rest are dated hairline rows. No load animation.
 */
export function Shipped() {
  const [lead, ...rest] = shipped;

  return (
    <section
      aria-labelledby="shipped-heading"
      className="rounded-xl border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-elevated)_72%,transparent)] px-[18px] pb-1.5 pt-4 backdrop-blur-[6px]"
    >
      <header className="mb-3 flex items-baseline justify-between gap-3">
        <h2
          id="shipped-heading"
          className="font-mono text-xs font-normal text-text-muted"
        >
          Recently shipped
        </h2>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11.5px] text-text-muted">
          <i
            aria-hidden="true"
            className="size-1.5 rounded-full bg-[var(--color-status-success)]"
          />
          1 product live
        </span>
      </header>

      <MaybeLink href={lead.href} className="group block">
        {lead.image && (
          <span className="relative block aspect-[16/10] overflow-hidden rounded-lg border border-[var(--color-border-subtle)] bg-[var(--color-bg-input)]">
            <Image
              src={lead.image.src}
              alt={lead.image.alt}
              fill
              sizes="(min-width: 960px) 344px, 100vw"
              priority
              className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.03]"
            />
          </span>
        )}
        <span className={`${ROW} pt-3`}>
          <RowBody item={lead} />
        </span>
      </MaybeLink>

      <ol role="list" className="border-t border-[var(--color-border-subtle)]">
        {rest.map((item) => (
          <li
            key={item.name}
            className="border-b border-[var(--color-border-subtle)] last:border-b-0"
          >
            <MaybeLink
              href={item.href}
              className={`group ${ROW} motion-safe:transition-[padding] motion-safe:duration-200 ${item.href ? "motion-safe:hover:pl-1.5" : ""}`}
            >
              <RowBody item={item} />
            </MaybeLink>
          </li>
        ))}
      </ol>
    </section>
  );
}
