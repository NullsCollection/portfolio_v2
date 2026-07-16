"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ZoomIn } from "lucide-react";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";
import { GitHubIcon } from "@/components/icons/BrandIcons";
import { AskAIButton } from "@/components/AskAIButton";
import { Lightbox } from "./Lightbox";

export function ProjectDetail({ project }: { project: Project }) {
  const images = project.images?.length ? project.images : [project.cover];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const metaRows: { label: string; value: string }[] = [
    project.role && { label: "Role", value: project.role },
    project.year && { label: "Year", value: project.year },
    project.client && { label: "Client", value: project.client },
  ].filter(Boolean) as { label: string; value: string }[];

  const hasMeta =
    metaRows.length > 0 ||
    (project.stack && project.stack.length > 0) ||
    project.tags.length > 0;

  return (
    <main className="dot-grid min-h-screen bg-[var(--color-bg-base)]">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-28">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-[var(--color-text-primary)]"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </Link>

        {/* Header */}
        <div className="mt-6">
          <p className="text-xs font-medium uppercase tracking-widest text-text-accent">
            {CATEGORY_LABELS[project.category]}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
            {project.description}
          </p>

          {/* Links */}
          <div className="mt-5 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
              >
                <ExternalLink className="h-4 w-4" /> Live site
              </a>
            )}
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-[var(--color-border-strong)]"
              >
                <ExternalLink className="h-4 w-4" /> View on Behance
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-[var(--color-border-strong)]"
              >
                <GitHubIcon className="h-4 w-4" /> Code
              </a>
            )}
            <AskAIButton variant="button" projectName={project.name} />
          </div>
        </div>

        {/* Meta + tags */}
        {hasMeta && (
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-[var(--color-border-subtle)] pt-6">
            {metaRows.map((row) => (
              <div key={row.label}>
                <p className="text-xs uppercase tracking-widest text-muted">
                  {row.label}
                </p>
                <p className="mt-1 text-sm text-text-primary">{row.value}</p>
              </div>
            ))}
            {project.stack && project.stack.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  Stack
                </p>
                <p className="mt-1 text-sm text-text-primary">
                  {project.stack.join(" · ")}
                </p>
              </div>
            )}
            {project.tags.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  Tags
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] bg-surface px-2.5 py-0.5 text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Gallery */}
        <div className="mt-10">
          <p className="mb-3 inline-flex items-center gap-1.5 text-xs text-muted">
            <ZoomIn className="h-3.5 w-3.5" />
            Click any image to view full size
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface"
                aria-label={`Open image ${i + 1} of ${images.length}`}
              >
                <Image
                  src={src}
                  alt={`${project.name} — image ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          alt={project.name}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </main>
  );
}
