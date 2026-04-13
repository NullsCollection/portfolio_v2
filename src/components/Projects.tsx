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
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-tertiary">
              Selected Work
            </p>
            <div className="flex items-end justify-between gap-4">
              <h2
                id="projects-heading"
                className="text-3xl font-semibold tracking-tight text-white"
              >
                Projects
              </h2>
              <a
                href="https://github.com/NullsCollection?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-sm text-muted transition-colors hover:text-white"
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
              <article className="group relative h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-surface">
                {/* Image or placeholder */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 via-surface to-tertiary/10" />
                )}

                {/* Persistent gradient overlay — ensures text is always readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

                {/* Links — top right, appear on hover */}
                <div className="absolute right-4 top-4 flex items-center gap-1.5 opacity-0 transition-all duration-200 group-hover:opacity-100">
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

                {/* Content — bottom overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="mb-1 text-sm font-semibold text-white">
                    {project.name}
                  </h3>
                  <p className="mb-3 text-xs leading-relaxed text-white/55 opacity-0 transition-all duration-300 group-hover:opacity-100 [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/65 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
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
