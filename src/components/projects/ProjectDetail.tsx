"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS, projects } from "@/data/projects";
import { AskAIButton } from "@/components/AskAIButton";
import { Lightbox } from "./Lightbox";

const EXTERNAL_LINK =
  "text-text-primary underline decoration-[var(--color-border-strong)] underline-offset-[3px] transition-[text-decoration-color] hover:decoration-[var(--color-accent)]";

/**
 * One case-study template for every project. Top to bottom: crumb, title,
 * one line, facts, cover, story, stack, gallery, prev / next, call to
 * action. Each section renders only when the data has something to say, so
 * a thin project gets a short page instead of empty headings.
 */
export function ProjectDetail({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // The cover leads; the gallery shows the rest without repeating it.
  const images = project.images?.length ? project.images : [project.cover];
  const lead = images.includes(project.cover) ? project.cover : images[0];
  const gallery = images.filter((src) => src !== lead);
  const viewer = [lead, ...gallery];

  const at = projects.findIndex((p) => p.id === project.id);
  const prev = projects[(at - 1 + projects.length) % projects.length];
  const next = projects[(at + 1) % projects.length];

  const links = [
    project.liveUrl && { label: "Live site", href: project.liveUrl },
    project.githubUrl && { label: "Source", href: project.githubUrl },
    project.externalUrl && { label: "Behance", href: project.externalUrl },
  ].filter(Boolean) as { label: string; href: string }[];

  const facts: [string, ReactNode][] = [];
  if (project.role) facts.push(["Role", project.role]);
  if (project.client) facts.push(["Client", project.client]);
  facts.push(["Type", CATEGORY_LABELS[project.category]]);
  if (project.stack?.length && !project.stackTable) {
    facts.push([
      "Stack",
      <span key="stack" className="font-mono text-[12.5px]">
        {project.stack.join(" · ")}
      </span>,
    ]);
  }
  if (project.private) {
    // Private work says so plainly, instead of just having no links.
    facts.push([
      "Links",
      <span
        key="private"
        className="inline-flex items-center gap-1.5 font-mono text-[12.5px] text-text-muted"
      >
        <i aria-hidden="true" className="size-1.5 rounded-full bg-text-muted" />
        Private · internal tool
      </span>,
    ]);
  } else if (links.length) {
    facts.push([
      "Links",
      <span key="links">
        {links.map((l, i) => (
          <span key={l.href}>
            {i > 0 && (
              <span aria-hidden="true" className="text-text-muted">
                {" · "}
              </span>
            )}
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK}
            >
              {l.label} <span aria-hidden="true">↗</span>
            </a>
          </span>
        ))}
      </span>,
    ]);
  }

  const story = [
    ["The problem", project.story?.problem],
    ["What I built", project.story?.built],
    ["Where it is now", project.story?.result],
  ].filter((s): s is [string, string] => Boolean(s[1]));

  return (
    <main id="main" className="dot-grid min-h-screen bg-[var(--color-bg-base)]">
      <div className="mx-auto max-w-[1080px] px-6 pb-[calc(clamp(56px,8vw,96px)+96px)] pt-[calc(64px+clamp(40px,7vw,80px))] max-[620px]:px-4">
        <header className="max-w-[720px]">
          <p className="mb-[18px] font-mono text-xs text-text-muted">
            <Link
              href="/projects"
              className="transition-colors hover:text-text-primary"
            >
              Work
            </Link>{" "}
            / {CATEGORY_LABELS[project.category]}
          </p>
          <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-[650] leading-none tracking-[-0.034em] text-text-primary">
            {project.name}
          </h1>
          <p className="mt-4 max-w-[52ch] text-pretty text-[clamp(1rem,1.6vw,1.1875rem)] leading-normal text-text-secondary">
            {project.description}
          </p>
        </header>

        <dl className="mt-7 grid grid-cols-[repeat(4,minmax(0,auto))] justify-start gap-x-12 gap-y-3.5 border-t border-[var(--color-border-subtle)] pt-[18px] max-[960px]:grid-cols-[repeat(2,minmax(0,auto))] max-[620px]:grid-cols-1 max-[620px]:gap-y-3">
          {facts.map(([label, value]) => (
            <div key={label} className="grid gap-[3px]">
              <dt className="text-[12.5px] text-text-muted">{label}</dt>
              <dd className="text-sm text-text-secondary">{value}</dd>
            </div>
          ))}
        </dl>

        <button
          type="button"
          onClick={() => setLightboxIndex(0)}
          aria-label={`Open image 1 of ${viewer.length}`}
          className="mt-[clamp(32px,5vw,48px)] block w-full cursor-zoom-in overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-input)]"
        >
          <Image
            src={lead}
            alt={project.name}
            width={2400}
            height={1600}
            sizes="(min-width: 1080px) 1032px, 100vw"
            priority
            className="h-auto w-full"
          />
        </button>

        {story.length > 0 && (
          <section
            aria-label="Case study"
            className="mt-[clamp(40px,6vw,64px)] grid grid-cols-3 gap-x-9 gap-y-7 border-t border-[var(--color-border-subtle)] pt-6 max-[860px]:grid-cols-1 max-[860px]:gap-y-[22px]"
          >
            {story.map(([heading, text]) => (
              <div key={heading}>
                <h2 className="mb-2 text-[13.5px] font-medium text-text-primary">
                  {heading}
                </h2>
                <p className="text-pretty text-sm leading-[1.65] text-text-secondary">
                  {text}
                </p>
              </div>
            ))}
          </section>
        )}

        {project.stackTable && (
          <section
            aria-labelledby="stack-heading"
            className="mt-[clamp(40px,6vw,64px)] max-w-[760px]"
          >
            <h2
              id="stack-heading"
              className="mb-2.5 text-[13.5px] font-medium text-text-primary"
            >
              Stack
            </h2>
            <dl>
              {project.stackTable.map(([area, uses]) => (
                <div
                  key={area}
                  className="grid grid-cols-[140px_1fr] gap-4 border-t border-[var(--color-border-subtle)] py-[9px] max-[620px]:grid-cols-1 max-[620px]:gap-0.5"
                >
                  <dt className="text-[13.5px] text-text-muted">{area}</dt>
                  <dd className="font-mono text-[12.5px] leading-relaxed text-text-secondary">
                    {uses}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {gallery.length > 0 && (
          // Two columns that stack mixed aspect ratios without cropping,
          // which matters for design work.
          <section
            aria-label="More images"
            className="mt-[clamp(40px,6vw,64px)] columns-2 gap-5 max-[620px]:columns-1"
          >
            {gallery.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setLightboxIndex(i + 1)}
                aria-label={`Open image ${i + 2} of ${viewer.length}`}
                className="mb-5 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-input)]"
              >
                <Image
                  src={src}
                  alt=""
                  width={1600}
                  height={1200}
                  sizes="(min-width: 1080px) 506px, (min-width: 620px) 50vw, 100vw"
                  className="h-auto w-full"
                />
              </button>
            ))}
          </section>
        )}

        <nav
          aria-label="More projects"
          className="mt-[clamp(40px,6vw,64px)] grid grid-cols-2 border-y border-[var(--color-border-subtle)]"
        >
          <Link href={`/projects/${prev.id}`} className="group grid gap-1 py-5">
            <span className="font-mono text-xs text-text-muted">
              ← Previous
            </span>
            <span className="text-base font-medium text-text-primary transition-colors group-hover:text-[var(--color-text-accent)] max-[620px]:text-[14.5px]">
              {prev.name}
            </span>
          </Link>
          <Link
            href={`/projects/${next.id}`}
            className="group grid gap-1 border-l border-[var(--color-border-subtle)] py-5 text-right"
          >
            <span className="font-mono text-xs text-text-muted">Next →</span>
            <span className="text-base font-medium text-text-primary transition-colors group-hover:text-[var(--color-text-accent)] max-[620px]:text-[14.5px]">
              {next.name}
            </span>
          </Link>
        </nav>

        <section className="mt-[clamp(40px,6vw,64px)] flex flex-wrap items-center justify-between gap-[18px]">
          <p className="text-[clamp(1.125rem,2vw,1.375rem)] tracking-[-0.01em] text-text-primary">
            Want something like {project.name}?
          </p>
          <div className="flex flex-wrap gap-2.5">
            <Link
              href="/book"
              className="inline-flex h-[38px] items-center rounded-lg border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 text-sm font-medium text-white transition-colors hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]"
            >
              Book a call
            </Link>
            <AskAIButton variant="button" projectName={project.name} />
            <Link
              href="/projects"
              className="inline-flex h-[38px] items-center rounded-lg border border-[var(--color-border)] px-4 text-sm font-medium text-text-secondary transition-colors hover:border-[var(--color-border-strong)] hover:text-text-primary"
            >
              All projects
            </Link>
          </div>
        </section>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={viewer}
          index={lightboxIndex}
          alt={project.name}
          onClose={() => setLightboxIndex(null)}
          onIndexChange={setLightboxIndex}
        />
      )}
    </main>
  );
}
