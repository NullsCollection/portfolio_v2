import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { WorkIndex } from "@/components/projects/WorkIndex";

export const metadata: Metadata = {
  title: "Work — Raffy Francisco",
  description:
    "Products, interfaces, automations and illustration by Raffy Francisco — filter by discipline, browse as a grid or scan as a list.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="dot-grid min-h-screen bg-[var(--color-bg-base)]">
        <div className="mx-auto max-w-[1080px] px-6 pb-[calc(clamp(56px,8vw,96px)+96px)] pt-[calc(64px+clamp(40px,7vw,80px))] max-[620px]:px-4">
          <header className="max-w-[720px]">
            <p className="mb-[18px] font-mono text-xs text-text-muted">
              <Link
                href="/"
                className="transition-colors hover:text-text-primary"
              >
                Home
              </Link>{" "}
              / Work
            </p>
            <h1 className="text-[clamp(2.4rem,6vw,4rem)] font-[650] leading-none tracking-[-0.034em] text-text-primary">
              Work
            </h1>
            <p className="mt-4 max-w-[52ch] text-pretty text-[clamp(1rem,1.6vw,1.1875rem)] leading-normal text-text-secondary">
              Products I built and run, interfaces I designed, and automations
              that keep working after I log off.
            </p>
          </header>

          {/* useSearchParams needs a Suspense boundary on a static page. */}
          <Suspense>
            <WorkIndex />
          </Suspense>
        </div>
      </main>
      <ThemeToggle />
    </>
  );
}
