# All-Projects Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/projects` masonry gallery of all 14 projects with per-project `/projects/[slug]` detail pages, and replace the homepage bento with a CTA linking to it.

**Architecture:** Data lives in `src/data/projects.ts` (extended `Project` type). `/projects` renders a client masonry with category + tag filters; `/projects/[slug]` renders one adaptive detail template that shows only the metadata that exists. Homepage swaps its `<Projects>` bento for a compact `<ProjectsCTA>`.

**Tech Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 (semantic tokens) · Framer Motion (`AnimateIn`) · `next/image`.

**Verification model:** This repo has **no test suite** (`CLAUDE.md`). Each task verifies via `npm run lint`, and the build/visual tasks via `npm run build` + a dev-server check at `http://localhost:3000`. Never introduce hardcoded hex/`white/NN` colors — use semantic tokens per `CLAUDE.md`.

---

## File Structure

| File | Responsibility | Created/Modified |
| --- | --- | --- |
| `src/data/projects.ts` | `Project` type + `ProjectCategory` + full 14-project catalog + helpers `getProject`, `allTags` | Modify |
| `src/components/FilterChips.tsx` | Generic single-select chip row (reused for categories + tags) | Create |
| `src/components/ProjectCard.tsx` | One masonry tile linking to detail page | Create |
| `src/components/ProjectsMasonry.tsx` | Client: filter state + CSS-columns masonry + empty state | Create |
| `src/components/Lightbox.tsx` | Click-to-zoom overlay (Esc / arrows) for gallery images | Create |
| `src/components/ProjectDetail.tsx` | Adaptive detail layout (case study or gallery) | Create |
| `src/components/ProjectsCTA.tsx` | Homepage CTA band replacing the bento | Create |
| `src/app/projects/page.tsx` | `/projects` index route | Create |
| `src/app/projects/[slug]/page.tsx` | Detail route + `generateStaticParams` + `notFound` | Create |
| `src/components/Nav.tsx` | Add "Work" → `/projects` link; make About/Contact hrefs page-agnostic | Modify |
| `src/app/page.tsx` | Swap `<Projects>` for `<ProjectsCTA>` | Modify |

`src/components/Projects.tsx` (the old bento) is left on disk but no longer imported. Removal is out of scope for this plan.

---

### Task 1: Extend `Project` type and backfill the full catalog

**Files:**
- Modify: `src/data/projects.ts` (full rewrite)

- [ ] **Step 1: Replace the file contents**

Filenames with spaces are URL-encoded (`%20`) in image paths. Covers prefer no-space files.

```ts
export type ProjectCategory = "design" | "uiux" | "webdev" | "ai-automation";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  design: "Design",
  uiux: "UI/UX",
  webdev: "Web Dev",
  "ai-automation": "AI Automation",
};

export interface Project {
  id: string; // slug → /projects/[id]
  name: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  cover: string;
  images?: string[];
  aspect?: "portrait" | "landscape" | "square";
  role?: string;
  year?: string;
  client?: string;
  stack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  externalUrl?: string;
}

const P = "/assets/projects";

export const projects: Project[] = [
  {
    id: "oneclick",
    name: "OneClick",
    category: "webdev",
    tags: ["Next.js", "TypeScript", "n8n", "Webhooks"],
    description:
      "SaaS platform for automated social media posting — schedule, publish, and track across platforms from one dashboard.",
    cover: `${P}/one-click-app/image.png`,
    images: [
      `${P}/one-click-app/1.png`,
      `${P}/one-click-app/2.png`,
      `${P}/one-click-app/3.png`,
      `${P}/one-click-app/4.png`,
      `${P}/one-click-app/5.png`,
      `${P}/one-click-app/6.jpg`,
    ],
    aspect: "landscape",
    role: "Full-stack developer",
    stack: ["Next.js", "TypeScript", "n8n", "Webhooks"],
    githubUrl:
      "https://github.com/NullsCollection/social-media-post-custom-forms",
    liveUrl: "https://oneclickpost.xyz/",
  },
  {
    id: "n8n-automation",
    name: "n8n Automation Flows",
    category: "ai-automation",
    tags: ["n8n", "AI Automation", "Webhooks"],
    description:
      "Business process automation workflows with AI integrations, webhook pipelines, and third-party API connections.",
    cover: `${P}/n8n/n8n-01.png`,
    images: [
      `${P}/n8n/n8n-01.png`,
      `${P}/n8n/n8n-02.png`,
      `${P}/n8n/n8n-03.png`,
      `${P}/n8n/n8n-04.png`,
      `${P}/n8n/n8n-05.png`,
    ],
    aspect: "landscape",
    role: "Automation engineer",
    stack: ["n8n", "Webhooks", "REST APIs"],
  },
  {
    id: "grb",
    name: "GRB Enterprises Inc.",
    category: "webdev",
    tags: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
    description:
      "A comprehensive web application built with Laravel and Tailwind CSS, featuring a modern dashboard, user management, and streamlined business operations.",
    cover: `${P}/grb/grb-01.jpg`,
    images: [`${P}/grb/grb-01.jpg`],
    aspect: "landscape",
    role: "Frontend developer",
    stack: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
    liveUrl: "https://grb.com.ph/",
  },
  {
    id: "lotto",
    name: "Lotto Platform",
    category: "uiux",
    tags: ["React", "TypeScript", "UI Design"],
    description:
      "A modern lottery platform built with React and TypeScript, featuring a sleek UI, real-time updates, and a seamless user experience.",
    cover: `${P}/lotto/lotto-01.jpg`,
    images: [`${P}/lotto/lotto-01.jpg`],
    aspect: "portrait",
    stack: ["React", "TypeScript"],
  },
  {
    id: "game-ui",
    name: "Game UI Design",
    category: "uiux",
    tags: ["Figma", "UI Design", "Game Design"],
    description:
      "UI/UX design for a live-streaming gaming application with a dark theme and dynamic visual elements.",
    cover: `${P}/GameUI/Artboard-1.png`,
    images: [
      `${P}/GameUI/Artboard-1.png`,
      `${P}/GameUI/Artboard%202.png`,
      `${P}/GameUI/Artboard%203.png`,
      `${P}/GameUI/Artboard%204.png`,
      `${P}/GameUI/Artboard%205.png`,
      `${P}/GameUI/Artboard%206.png`,
      `${P}/GameUI/6.jpg`,
    ],
    aspect: "portrait",
    role: "UI/UX designer",
    externalUrl:
      "https://www.behance.net/gallery/220534759/Mobile-App-for-Live-Streaming-StreamZ",
  },
  {
    id: "moscot",
    name: "Character Design — Monsters",
    category: "design",
    tags: ["Illustrator", "Character Design", "Digital Art"],
    description:
      "Complete character design package — original concepts, polished illustrations, custom color palettes, expressive poses, and ready-to-use assets.",
    cover: `${P}/Monster/Artboard-1.png`,
    images: [
      `${P}/Monster/Artboard-1.png`,
      `${P}/Monster/Artboard-2.png`,
      `${P}/Monster/Artboard%203.png`,
      `${P}/Monster/Artboard%204.png`,
      `${P}/Monster/Artboard%205.png`,
      `${P}/Monster/Artboard%206.png`,
      `${P}/Monster/Artboard%207.png`,
      `${P}/Monster/Artboard%208.jpg`,
    ],
    aspect: "square",
    role: "Illustrator",
    externalUrl:
      "https://www.behance.net/gallery/222146595/Character-Design-Monsters",
  },
  {
    id: "travel-portal",
    name: "Travel Portal",
    category: "uiux",
    tags: ["Web Design", "UI/UX", "Figma"],
    description:
      "A travel portal with a user-friendly interface, real-time flight and hotel search, and secure payment processing.",
    cover: `${P}/TravelPortal/Artboard-1.png`,
    images: [
      `${P}/TravelPortal/Artboard-1.png`,
      `${P}/TravelPortal/Artboard%202.png`,
      `${P}/TravelPortal/Home%20Pages.png`,
    ],
    aspect: "landscape",
    role: "UI/UX designer",
    externalUrl:
      "https://www.behance.net/gallery/224074537/Travel-Portal-Web-Design",
  },
  {
    id: "rrm",
    name: "RRM",
    category: "webdev",
    tags: ["Web App", "Frontend"],
    description: "Web application interface and dashboard build.",
    cover: `${P}/RRM/rrm-01.jpg`,
    images: [
      `${P}/RRM/rrm-01.jpg`,
      `${P}/RRM/RRM.jpg`,
      `${P}/RRM/rrm-details.png`,
    ],
    aspect: "landscape",
  },
  {
    id: "real-estate",
    name: "Real Estate Platform",
    category: "uiux",
    tags: ["UI/UX", "Web Design", "Figma"],
    description: "Real estate listing and property browsing experience.",
    cover: `${P}/RealState/1.png`,
    images: [
      `${P}/RealState/1.png`,
      `${P}/RealState/2.png`,
      `${P}/RealState/3.png`,
      `${P}/RealState/4.png`,
      `${P}/RealState/5.png`,
    ],
    aspect: "landscape",
  },
  {
    id: "logo",
    name: "Logo Design",
    category: "design",
    tags: ["Branding", "Logo", "Illustrator"],
    description: "A collection of logo and brand mark explorations.",
    cover: `${P}/Logo/1.jpg`,
    images: [
      `${P}/Logo/1.jpg`,
      `${P}/Logo/2.jpg`,
      `${P}/Logo/3.jpg`,
      `${P}/Logo/4.jpg`,
      `${P}/Logo/5.png`,
    ],
    aspect: "square",
  },
  {
    id: "christmas",
    name: "Christmas Branding",
    category: "design",
    tags: ["Branding", "Illustration", "Social Media"],
    description: "Seasonal branding — concepts, mockups, and social assets.",
    cover: `${P}/Christmas/UI-Christmas.jpg`,
    images: [
      `${P}/Christmas/1.jpg`,
      `${P}/Christmas/3.jpg`,
      `${P}/Christmas/concept-1.jpg`,
      `${P}/Christmas/concept-2.jpg`,
      `${P}/Christmas/mockup-1.jpg`,
      `${P}/Christmas/mockup-2.jpg`,
      `${P}/Christmas/pfp.jpg`,
      `${P}/Christmas/UI-Christmas.jpg`,
    ],
    aspect: "portrait",
  },
  {
    id: "halloween",
    name: "Halloween Art",
    category: "design",
    tags: ["Illustration", "Digital Art"],
    description: "Halloween-themed illustration set.",
    cover: `${P}/Halloween/1.jpg`,
    images: [
      `${P}/Halloween/1.jpg`,
      `${P}/Halloween/2.jpg`,
      `${P}/Halloween/3.jpg`,
      `${P}/Halloween/4.jpg`,
      `${P}/Halloween/5.jpg`,
      `${P}/Halloween/6.jpg`,
      `${P}/Halloween/7.jpg`,
      `${P}/Halloween/H-1.jpg`,
    ],
    aspect: "portrait",
  },
  {
    id: "cats",
    name: "Cats",
    category: "design",
    tags: ["Illustration", "Digital Art"],
    description: "Cat character illustration.",
    cover: `${P}/Cats/cats_1.jpg`,
    images: [`${P}/Cats/cats_1.jpg`],
    aspect: "square",
  },
  {
    id: "sonic",
    name: "Sonic",
    category: "design",
    tags: ["Fan Art", "Illustration", "Digital Art"],
    description: "Sonic-themed fan art illustration series.",
    cover: `${P}/Sonic/1.jpg`,
    images: [
      `${P}/Sonic/1.jpg`,
      `${P}/Sonic/3.jpg`,
      `${P}/Sonic/5.jpg`,
      `${P}/Sonic/7.jpg`,
    ],
    aspect: "portrait",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function allTags(): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS (no errors). The old `image`/`featured` fields are gone; `Projects.tsx` still imports `projects` but only reads `name`/`description`/`tags` plus the now-removed `image`/`featured`. **This will produce type errors in `Projects.tsx`** — that is expected and resolved in Task 10 when the homepage stops importing it. If `npm run lint` blocks on it, proceed; `npm run build` is the gate and runs after Task 10.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.ts
git commit -m "feat: extend Project type and backfill full project catalog"
```

---

### Task 2: `FilterChips` component

**Files:**
- Create: `src/components/FilterChips.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

export interface ChipOption {
  label: string;
  value: string;
}

interface FilterChipsProps {
  options: ChipOption[];
  active: string;
  onChange: (value: string) => void;
  ariaLabel: string;
}

export function FilterChips({
  options,
  active,
  onChange,
  ariaLabel,
}: FilterChipsProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="flex flex-wrap gap-2"
    >
      {options.map((opt) => {
        const isActive = opt.value === active;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            aria-pressed={isActive}
            className={[
              "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
              isActive
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-white"
                : "border-[var(--color-border)] bg-surface text-muted hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-strong)]",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS for this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/FilterChips.tsx
git commit -m "feat: add FilterChips component"
```

---

### Task 3: `ProjectCard` component

**Files:**
- Create: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Create the file**

```tsx
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";

const ASPECT_CLASS: Record<NonNullable<Project["aspect"]>, string> = {
  portrait: "aspect-[3/4]",
  landscape: "aspect-[4/3]",
  square: "aspect-square",
};

export function ProjectCard({ project }: { project: Project }) {
  const aspect = ASPECT_CLASS[project.aspect ?? "landscape"];

  return (
    <Link
      href={`/projects/${project.id}`}
      aria-label={`${project.name} — view project`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface"
    >
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
    </Link>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS for this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.tsx
git commit -m "feat: add ProjectCard masonry tile"
```

---

### Task 4: `ProjectsMasonry` component (filter + grid)

**Files:**
- Create: `src/components/ProjectsMasonry.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useMemo, useState } from "react";
import { projects, CATEGORY_LABELS, allTags } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import { FilterChips, type ChipOption } from "./FilterChips";
import { ProjectCard } from "./ProjectCard";
import { AnimateIn } from "./AnimateIn";

const CATEGORY_OPTIONS: ChipOption[] = [
  { label: "All", value: "all" },
  ...(Object.keys(CATEGORY_LABELS) as ProjectCategory[]).map((c) => ({
    label: CATEGORY_LABELS[c],
    value: c,
  })),
];

export function ProjectsMasonry() {
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");

  const tagOptions: ChipOption[] = useMemo(
    () => [
      { label: "All tags", value: "all" },
      ...allTags().map((t) => ({ label: t, value: t })),
    ],
    [],
  );

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (category === "all" || p.category === category) &&
          (tag === "all" || p.tags.includes(tag)),
      ),
    [category, tag],
  );

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3">
        <FilterChips
          options={CATEGORY_OPTIONS}
          active={category}
          onChange={setCategory}
          ariaLabel="Filter projects by category"
        />
        <FilterChips
          options={tagOptions}
          active={tag}
          onChange={setTag}
          ariaLabel="Filter projects by tag"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-muted">
          No projects match those filters.
        </p>
      ) : (
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {filtered.map((project, i) => (
            <AnimateIn
              key={project.id}
              delay={(i % 6) * 0.05}
              className="block break-inside-avoid"
            >
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify `AnimateIn` accepts `className` and `delay`**

Run: `cat src/components/AnimateIn.tsx`
Expected: props include `delay?: number` and `className?: string`. If `className` is NOT supported, wrap each card in a `<div className="block break-inside-avoid">` and put `<AnimateIn delay={...}>` inside it instead.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: PASS for this file.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsMasonry.tsx
git commit -m "feat: add ProjectsMasonry with category and tag filters"
```

---

### Task 5: `/projects` index route

**Files:**
- Create: `src/app/projects/page.tsx`

- [ ] **Step 1: Create the file**

```tsx
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProjectsMasonry } from "@/components/ProjectsMasonry";
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
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS for this file.

- [ ] **Step 3: Visual check**

Run: `npm run dev`, open `http://localhost:3000/projects`
Expected: masonry of 14 cards; clicking a category chip filters; clicking a tag chip filters; hover shows caption. Toggle theme — colors adapt.

- [ ] **Step 4: Commit**

```bash
git add src/app/projects/page.tsx
git commit -m "feat: add /projects masonry index route"
```

---

### Task 6: `Lightbox` component

**Files:**
- Create: `src/components/Lightbox.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}

export function Lightbox({
  images,
  index,
  alt,
  onClose,
  onIndexChange,
}: LightboxProps) {
  const prev = useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange],
  );
  const next = useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} image viewer`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous image"
            className="absolute left-4 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next image"
            className="absolute right-4 bottom-1/2 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        className="relative h-[85vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt} — image ${index + 1}`}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS for this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/Lightbox.tsx
git commit -m "feat: add Lightbox image viewer"
```

---

### Task 7: `ProjectDetail` component (adaptive)

**Files:**
- Create: `src/components/ProjectDetail.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import type { Project } from "@/data/projects";
import { CATEGORY_LABELS } from "@/data/projects";
import { GitHubIcon } from "./icons/BrandIcons";
import { Lightbox } from "./Lightbox";

export function ProjectDetail({ project }: { project: Project }) {
  const images = project.images?.length ? project.images : [project.cover];
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const metaRows: { label: string; value: string }[] = [
    project.role && { label: "Role", value: project.role },
    project.year && { label: "Year", value: project.year },
    project.client && { label: "Client", value: project.client },
  ].filter(Boolean) as { label: string; value: string }[];

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
          </div>
        </div>

        {/* Meta + tags */}
        {(metaRows.length > 0 ||
          (project.stack && project.stack.length > 0) ||
          project.tags.length > 0) && (
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
          </div>
        )}

        {/* Gallery */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS for this file.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectDetail.tsx
git commit -m "feat: add adaptive ProjectDetail with lightbox gallery"
```

---

### Task 8: `/projects/[slug]` detail route

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create the file**

Note: Next.js 15+/16 `params` is async — it must be awaited.

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ProjectDetail } from "@/components/ProjectDetail";
import { projects, getProject } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — Raffy Francisco`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <>
      <Nav />
      <ProjectDetail project={project} />
      <ThemeToggle />
    </>
  );
}
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS for this file.

- [ ] **Step 3: Visual check**

With `npm run dev` running, open `http://localhost:3000/projects/oneclick` and `http://localhost:3000/projects/sonic`.
Expected: oneclick shows role/stack/links + gallery; sonic shows just description + gallery (no empty meta rows). Clicking an image opens the lightbox; Esc and arrow keys work. Visit `http://localhost:3000/projects/does-not-exist` → 404.

- [ ] **Step 4: Commit**

```bash
git add "src/app/projects/[slug]/page.tsx"
git commit -m "feat: add /projects/[slug] detail route"
```

---

### Task 9: Nav — add Projects link, make anchors page-agnostic

**Files:**
- Modify: `src/components/Nav.tsx:7-11`

- [ ] **Step 1: Replace the `NAV_LINKS` constant**

Old:

```tsx
const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
```

New (Work points to the gallery route; About/Contact prefixed with `/` so they work from any page):

```tsx
const NAV_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;
```

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: link Nav Work to /projects, make anchors page-agnostic"
```

---

### Task 10: Homepage — replace bento with `ProjectsCTA`

**Files:**
- Create: `src/components/ProjectsCTA.tsx`
- Modify: `src/app/page.tsx:4` (import) and `:30` (usage)

- [ ] **Step 1: Create `ProjectsCTA.tsx`**

Keeps `id="projects"` so the in-page experience and any `/#projects` anchor still land here. Shows 4 featured covers.

```tsx
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { AnimateIn } from "./AnimateIn";

const FEATURED_IDS = ["oneclick", "lotto", "game-ui", "moscot"];

export function ProjectsCTA() {
  const featured = FEATURED_IDS.map((id) =>
    projects.find((p) => p.id === id),
  ).filter(Boolean) as typeof projects;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn>
          <div className="mb-10">
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
              <Link
                href="/projects"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm text-muted transition-colors hover:text-text-primary"
              >
                View all projects
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featured.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 0.07}>
              <Link
                href={`/projects/${project.id}`}
                className="group relative block aspect-square overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface"
              >
                <Image
                  src={project.cover}
                  alt={project.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-xs font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {project.name}
                </span>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.1}>
          <Link
            href="/projects"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Browse all 14 projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update `src/app/page.tsx`**

Change the import on line 4:

```tsx
import { ProjectsCTA } from "@/components/ProjectsCTA";
```

Change the usage (was `<Projects />`):

```tsx
<ProjectsCTA />
```

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: PASS. The homepage no longer imports the old `Projects.tsx`, so its stale field references no longer break the typed build.

- [ ] **Step 4: Commit**

```bash
git add src/components/ProjectsCTA.tsx src/app/page.tsx
git commit -m "feat: replace homepage bento with ProjectsCTA band"
```

---

### Task 11: Full build verification

**Files:** none (verification only)

- [ ] **Step 1: Lint the whole project**

Run: `npm run lint`
Expected: PASS, no errors.

- [ ] **Step 2: Production build**

Run: `npm run build`
Expected: build succeeds. `/projects` and all 14 `/projects/[slug]` pages are statically generated (visible in the route output). No type errors, no missing-image errors.

- [ ] **Step 3: Manual smoke test**

Run: `npm run dev`, then verify:
- `http://localhost:3000` → homepage shows `ProjectsCTA` band, "View all projects" link works.
- `http://localhost:3000/projects` → 14 cards, category + tag filters work, empty-state shows when a filter combo has no matches.
- A few `/projects/[slug]` pages → adaptive layout, lightbox, 404 on bad slug.
- Toggle light/dark on each page → colors adapt, no hardcoded-color glitches.

- [ ] **Step 4: Final commit (if any cleanup was needed)**

```bash
git add -A
git commit -m "chore: all-projects page verification fixes"
```

---

## Self-Review

**Spec coverage:**
- Masonry index with category + tag filters → Tasks 4, 5 ✓
- Per-project detail pages `/projects/[slug]` → Tasks 7, 8 ✓
- Adaptive template (case study vs gallery) → Task 7 (meta rows + links render conditionally) ✓
- Extended `Project` data model + 14-project backfill → Task 1 ✓
- Homepage bento replaced by CTA → Task 10 ✓
- Nav links to gallery → Task 9 ✓
- Lightbox → Task 6, wired in Task 7 ✓
- Semantic tokens only, theme-aware → enforced in every component task ✓
- Error handling: unknown slug `notFound`, single-image gallery, missing-cover fallback, empty-filter state → Tasks 7, 8, 3, 4 ✓
- Success criteria (build + lint pass) → Task 11 ✓

**Placeholder scan:** No TBD/TODO in code steps. RRM/Real-Estate descriptions are intentionally short real copy (not placeholders); their optional metadata is correctly omitted, which the adaptive template handles.

**Type consistency:** `Project`, `ProjectCategory`, `CATEGORY_LABELS`, `getProject`, `allTags` defined in Task 1 and used consistently in Tasks 3, 4, 7, 8, 10. `ChipOption`/`FilterChips` props defined in Task 2 and consumed in Task 4. `Lightbox` props (`images`, `index`, `alt`, `onClose`, `onIndexChange`) defined in Task 6 and matched in Task 7. `aspect` union matches `ASPECT_CLASS` keys.

**Known dependency to confirm during execution:** Task 4 Step 2 verifies `AnimateIn` supports `className` + `delay` before relying on it.
