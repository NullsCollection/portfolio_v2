import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProjectsMasonry } from "@/components/projects/ProjectsMasonry";
import { AnimateIn } from "@/components/AnimateIn";

export const metadata: Metadata = {
  title: "Projects — Raffy Francisco",
  description:
    "Graphic design, UI/UX, frontend web development, and AI automation work by Raffy Francisco.",
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main className="dot-grid min-h-screen bg-[var(--color-bg-base)]">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-28">
          <AnimateIn>
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-accent">
              Selected &amp; full work
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              All Projects
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Design, UI/UX, web development, and AI automation — filter by
              discipline or tag.
            </p>
          </AnimateIn>

          <div className="mt-10">
            <ProjectsMasonry />
          </div>
        </div>
      </main>
      <ThemeToggle />
    </>
  );
}
