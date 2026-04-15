"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "./icons/BrandIcons";
import { projects } from "@/data/projects";
import { AnimateIn } from "./AnimateIn";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn>
          <div className="mb-12">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-accent">
              Selected Work
            </p>
            <div className="flex items-end justify-between gap-4">
              <h2
                id="projects-heading"
                className="text-3xl font-semibold tracking-tight text-text-primary"
              >
                Projects
              </h2>
              <a
                href="https://github.com/NullsCollection?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm text-muted transition-colors hover:text-text-primary"
              >
                View all ↗
              </a>
            </div>
          </div>
        </AnimateIn>

        {/* Bento grid — 3 cols desktop, 2 cols tablet, 1 col mobile */}
        <div className="grid auto-rows-[280px] grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {projects.map((project, i) => (
            <AnimateIn
              key={project.id}
              delay={i * 0.07}
              className={project.featured ? "sm:col-span-2" : "col-span-1"}
            >
              <article className="group relative h-full w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface">
                {/* Image or placeholder */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-surface to-tertiary/10" />
                )}

                {/* Gradient — subtle at rest, darkens on hover to make text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-400 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/5 opacity-0 transition-opacity duration-400 group-hover:opacity-100" />

                {/* All content — hidden at rest, slides up on hover */}
                <div className="absolute inset-0 flex flex-col justify-end translate-y-4 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100 p-5">
                  {/* Links — top right */}
                  <div className="absolute right-4 top-4 flex items-center gap-1.5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} on GitHub`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:text-white"
                      >
                        <GitHubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.name} live site`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:text-white"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-sm font-semibold text-white">
                      {project.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/70 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/80 backdrop-blur-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
