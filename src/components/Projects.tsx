import Image from "next/image";
import Link from "next/link";
import { CATEGORY_LABELS, projects, type Project } from "@/data/projects";
import { AnimateIn } from "./AnimateIn";
import { AskAIButton } from "./AskAIButton";
import { Band } from "./Band";

/** The three cards that lead the Work band, in order. */
const FEATURED_IDS = ["oneclick", "lottery-backoffice", "game-ui"];
/** Quiet rows under the cards; the full archive lives at /projects. */
const ROW_LIMIT = 7;

const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
  (p): p is Project => Boolean(p),
);
const rows = projects
  .filter((p) => !FEATURED_IDS.includes(p.id))
  .slice(0, ROW_LIMIT);

/**
 * Work band: three captioned cards, then the rest as hairline rows, then a
 * link to everything. Cards use a stretched link so the Ask AI chip stays a
 * sibling of the link rather than a button inside it.
 */
export function Projects() {
  return (
    <Band id="projects" name="Work">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-x-6 gap-y-7">
        {featured.map((project, i) => (
          <AnimateIn key={project.id} delay={i * 0.07}>
            <FeatureCard project={project} />
          </AnimateIn>
        ))}
      </div>

      <ul
        role="list"
        className="mt-[46px] border-t border-[var(--color-border-subtle)]"
      >
        {rows.map((project) => (
          <li
            key={project.id}
            className="border-b border-[var(--color-border-subtle)]"
          >
            <Link
              href={`/projects/${project.id}`}
              className="grid grid-cols-[1fr_auto_62px] items-baseline gap-4 py-[13px] text-text-primary motion-safe:transition-[padding] motion-safe:duration-200 motion-safe:hover:pl-[9px] max-[620px]:grid-cols-[1fr_auto]"
            >
              <span className="text-[14.5px]">{project.name}</span>
              <span className="text-[13px] text-text-muted max-[620px]:hidden">
                {CATEGORY_LABELS[project.category]}
              </span>
              {/* Year only when the data has one — never a guess. */}
              <span className="text-right font-mono text-xs text-text-muted">
                {project.year ?? ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Link
        href="/projects"
        className="group mt-6 inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        All {projects.length} projects
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          →
        </span>
      </Link>
    </Band>
  );
}

function FeatureCard({ project }: { project: Project }) {
  const meta = (project.stack ?? project.tags).slice(0, 3).join(" · ");

  return (
    <article className="group relative grid gap-[7px]">
      <div className="relative mb-[5px] aspect-[4/3] overflow-hidden rounded-md border border-[var(--color-border)] bg-[var(--color-bg-input)]">
        <Image
          src={project.cover}
          alt={project.name}
          fill
          sizes="(min-width: 1080px) 284px, (min-width: 620px) 33vw, 100vw"
          className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.028]"
        />
      </div>
      <h3 className="text-[15px] font-medium text-text-primary group-hover:underline group-hover:underline-offset-[3px]">
        {project.name}
      </h3>
      <p className="text-pretty text-[13.5px] leading-[1.55] text-text-secondary">
        {project.summary ?? project.description}
      </p>
      <p className="font-mono text-[11.5px] text-text-muted">{meta}</p>

      <Link
        href={`/projects/${project.id}`}
        aria-label={`View ${project.name}`}
        className="absolute inset-0 z-10 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--color-bg-base)]"
      />
      <div className="absolute right-2.5 top-2.5 z-20">
        <AskAIButton projectName={project.name} />
      </div>
    </article>
  );
}
