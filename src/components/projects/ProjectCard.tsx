import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";
import { AskAIButton } from "@/components/AskAIButton";

const ASPECT_CLASS: Record<NonNullable<Project["aspect"]>, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function ProjectCard({ project }: { project: Project }) {
  const aspect = ASPECT_CLASS[project.aspect ?? "landscape"];

  return (
    <div className="group relative block w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface">
      {/* Stretched link — whole card navigates; keeps the AskAI button out of the anchor */}
      <Link
        href={`/projects/${project.id}`}
        aria-label={`${project.name} — view project`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ring-offset-[var(--color-bg-base)]"
      />

      <div className={`relative w-full ${aspect}`}>
        {project.cover ? (
          <Image
            src={project.cover}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-surface to-tertiary/10" />
        )}

        {/* Hover scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 via-indigo-950/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Caption */}
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[11px] font-medium uppercase tracking-widest text-white/70">
            {CATEGORY_LABELS[project.category]}
          </p>
          <h3 className="mt-0.5 text-sm font-semibold text-white">
            {project.name}
          </h3>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white/80 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Always visible — works on touch, above the stretched link */}
      <AskAIButton
        projectName={project.name}
        className="absolute right-3 top-3 z-20"
      />
    </div>
  );
}
