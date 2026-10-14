"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { LayoutGrid, List } from "lucide-react";
import {
  CATEGORY_LABELS,
  projects,
  type Project,
  type ProjectCategory,
} from "@/data/projects";
import { AskAIButton } from "@/components/AskAIButton";

type View = "grid" | "list";
type Filter = ProjectCategory | "all";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as ProjectCategory[];

const isCategory = (v: string | null): v is ProjectCategory =>
  v !== null && v in CATEGORY_LABELS;

const PILL =
  "inline-flex h-8 cursor-pointer items-center gap-[7px] rounded-[7px] border px-3 text-[13.5px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";
const PILL_ON =
  "border-[var(--color-border)] bg-[var(--color-bg-elevated)] text-text-primary";
const PILL_OFF =
  "border-transparent text-text-muted hover:text-text-primary";

/**
 * Work index. Two options, both kept in the URL (?cat=uiux&view=list) so a
 * filtered view can be shared and the back button behaves:
 * - filter by discipline (with counts, so an empty tab never surprises)
 * - Grid (big images, for browsing) or List (dense rows, for scanning)
 */
export function WorkIndex() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const cat: Filter = isCategory(params.get("cat"))
    ? (params.get("cat") as ProjectCategory)
    : "all";
  const view: View = params.get("view") === "list" ? "list" : "grid";

  const update = (next: { cat?: Filter; view?: View }) => {
    const q = new URLSearchParams(params.toString());
    const c = next.cat ?? cat;
    const v = next.view ?? view;
    if (c === "all") q.delete("cat");
    else q.set("cat", c);
    if (v === "grid") q.delete("view");
    else q.set("view", v);
    const s = q.toString();
    router.replace(s ? `${pathname}?${s}` : pathname, { scroll: false });
  };

  const shown =
    cat === "all" ? projects : projects.filter((p) => p.category === cat);

  const filters: [Filter, string, number][] = [
    ["all", "All", projects.length],
    ...CATEGORIES.map(
      (c): [Filter, string, number] => [
        c,
        CATEGORY_LABELS[c],
        projects.filter((p) => p.category === c).length,
      ],
    ).filter(([, , n]) => n > 0),
  ];

  return (
    <>
      <div className="sticky top-16 z-30 mt-[clamp(32px,5vw,48px)] flex flex-wrap items-center justify-between gap-3 border-y border-[var(--color-border-subtle)] bg-[color-mix(in_srgb,var(--color-bg-base)_88%,transparent)] py-3 backdrop-blur-md">
        <div
          role="group"
          aria-label="Filter by type"
          className="flex flex-wrap gap-1.5"
        >
          {filters.map(([value, label, count]) => (
            <button
              key={value}
              type="button"
              aria-pressed={cat === value}
              onClick={() => update({ cat: value })}
              className={`${PILL} ${cat === value ? PILL_ON : PILL_OFF}`}
            >
              {label}
              <span className="font-mono text-[11px] text-text-muted">
                {count}
              </span>
            </button>
          ))}
        </div>

        <div
          role="group"
          aria-label="Layout"
          className="inline-flex gap-0.5 rounded-[9px] border border-[var(--color-border-subtle)] p-0.5"
        >
          {(
            [
              ["grid", "Grid", LayoutGrid],
              ["list", "List", List],
            ] as const
          ).map(([value, label, Icon]) => (
            <button
              key={value}
              type="button"
              aria-pressed={view === value}
              aria-label={label}
              onClick={() => update({ view: value })}
              className={`${PILL} h-7 px-2.5 ${view === value ? PILL_ON : PILL_OFF}`}
            >
              <Icon className="h-[15px] w-[15px]" aria-hidden="true" />
              <span className="max-[620px]:hidden">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <p
        aria-live="polite"
        className="mb-5 mt-[18px] font-mono text-xs text-text-muted"
      >
        {shown.length} {shown.length === 1 ? "project" : "projects"}
      </p>

      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-x-7 gap-y-10 max-[620px]:grid-cols-1 max-[620px]:gap-y-8">
          {shown.map((p, i) => (
            <GridCard key={p.id} project={p} priority={i === 0} />
          ))}
        </div>
      ) : (
        <ol role="list" className="border-t border-[var(--color-border-subtle)]">
          {shown.map((p, i) => (
            <ListRow key={p.id} project={p} index={i} />
          ))}
        </ol>
      )}
    </>
  );
}

/** Browse: big image, featured work spans the row. Stretched link keeps the
 *  Ask AI chip a sibling of the link rather than a button inside it. */
function GridCard({
  project: p,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <article
      className={`group relative grid grid-cols-[1fr_auto] gap-x-3 ${p.featured ? "col-span-2 max-[620px]:col-span-1" : ""}`}
    >
      <div
        className={`relative col-span-2 mb-3.5 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-input)] ${p.featured ? "aspect-[21/9] max-[620px]:aspect-[4/3]" : "aspect-[4/3]"}`}
      >
        <Image
          src={p.cover}
          alt=""
          priority={priority}
          fill
          sizes={p.featured ? "(min-width: 1080px) 1032px, 100vw" : "(min-width: 1080px) 502px, (min-width: 620px) 50vw, 100vw"}
          className="object-cover object-top motion-safe:transition-transform motion-safe:duration-[600ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.025]"
        />
      </div>

      <div className="grid gap-[3px]">
        <h2 className="text-base font-medium text-text-primary group-hover:underline group-hover:underline-offset-[3px]">
          {p.name}
        </h2>
        <p className="line-clamp-2 max-w-[60ch] text-[13.5px] leading-[1.55] text-text-secondary">
          {p.description}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="font-mono text-sm text-text-muted transition-[color,transform] duration-200 group-hover:translate-x-[3px] group-hover:text-[var(--color-text-accent)]"
      >
        →
      </span>
      <span className="col-span-2 mt-2 font-mono text-[11.5px] text-text-muted">
        {CATEGORY_LABELS[p.category]}
      </span>

      <Link
        href={`/projects/${p.id}`}
        aria-label={`View ${p.name}`}
        className="absolute inset-0 z-10 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg-base)]"
      />

      {/* Direct child of the card, above the stretched link (same as the
          homepage bento) so the click asks the AI instead of navigating. */}
      <div className="absolute right-3 top-3 z-20">
        <AskAIButton projectName={p.name} />
      </div>
    </article>
  );
}

/** Scan: numbered rows with a small thumb. Stack hides under 960px; number
 *  and category hide under 620px. */
function ListRow({ project: p, index }: { project: Project; index: number }) {
  return (
    <li className="border-b border-[var(--color-border-subtle)]">
      <Link
        href={`/projects/${p.id}`}
        className="group grid grid-cols-[30px_72px_minmax(0,1fr)_120px_180px_16px] items-center gap-[18px] py-3 transition-colors hover:bg-[color-mix(in_srgb,var(--color-bg-elevated)_60%,transparent)] max-[960px]:grid-cols-[30px_72px_minmax(0,1fr)_110px_16px] max-[620px]:grid-cols-[64px_minmax(0,1fr)_16px] max-[620px]:gap-3.5"
      >
        <span className="font-mono text-[11.5px] text-text-muted max-[620px]:hidden">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="relative block aspect-[4/3] w-[72px] overflow-hidden rounded-[5px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-input)] max-[620px]:w-16">
          <Image
            src={p.cover}
            alt=""
            fill
            sizes="72px"
            className="object-cover object-top"
          />
        </span>
        <span className="grid min-w-0 gap-px">
          <span className="text-[14.5px] text-text-primary">{p.name}</span>
          <span className="truncate text-[13px] text-text-muted">
            {p.description}
          </span>
        </span>
        <span className="font-mono text-[11.5px] text-text-muted max-[620px]:hidden">
          {CATEGORY_LABELS[p.category]}
        </span>
        <span className="truncate font-mono text-[11.5px] text-text-muted max-[960px]:hidden">
          {(p.stack ?? []).slice(0, 3).join(" · ")}
        </span>
        <span
          aria-hidden="true"
          className="font-mono text-xs text-text-muted transition-[color,transform] duration-200 group-hover:translate-x-[3px] group-hover:text-[var(--color-text-accent)]"
        >
          →
        </span>
      </Link>
    </li>
  );
}
