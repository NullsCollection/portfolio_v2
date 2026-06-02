# All-Projects Page — Design Spec

**Date:** 2026-05-31
**Author:** Raffy Francisco (with Claude)
**Status:** Approved design → ready for implementation plan

## Goal

Create a dedicated page that showcases **every** project across Raffy's four
disciplines — graphic design, UI/UX, frontend web development, and AI automation
— with per-project detail pages. Today the homepage only surfaces 7 of ~14
projects; half the portfolio (Logo, Christmas, Halloween, Cats, Sonic, RRM,
RealEstate) is invisible. This page makes the full range visible.

## Decisions (locked)

| Decision | Choice |
| --- | --- |
| Layout | Pinterest-style **masonry**, tag/category-driven |
| Depth | **Per-project detail pages** at `/projects/[slug]` |
| Homepage | **Replace** the bento `<Projects>` section with a compact CTA band |
| Detail template | **One adaptive template** (Approach A) — renders a case study or a pure gallery depending on which fields exist |
| Case-study copy | **Light metadata only** now (role, year, stack, links, gallery, short blurb); long-form fields left optional for later |

## Architecture

### Data model — `src/data/projects.ts`

Extend the `Project` type. One entry drives both the masonry card and the
detail page.

```ts
export type ProjectCategory = "design" | "uiux" | "webdev" | "ai-automation";

export interface Project {
  id: string;               // slug → /projects/[id]
  name: string;
  category: ProjectCategory; // drives filter chips
  tags: string[];           // free-form, also filterable
  description: string;      // short blurb
  cover: string;            // masonry cover image
  images?: string[];        // full set for the detail gallery
  aspect?: "portrait" | "landscape" | "square"; // masonry height hint
  // optional light metadata — detail page renders only what exists
  role?: string;
  year?: string;
  client?: string;
  stack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  externalUrl?: string;     // Behance, etc.
}
```

Category → discipline mapping:
- `design` — graphic design / illustration
- `uiux` — UI/UX design
- `webdev` — frontend web development
- `ai-automation` — automation / AI workflows

**Migration note:** the existing field `image` becomes `cover`; existing entries
gain `category`, `images`, and (where known) light metadata. The old
`featured` flag is dropped from the type unless reused by the homepage CTA strip
(see Homepage).

### Routes

- **`/projects`** — masonry index. Server component shell renders a client
  `<ProjectsMasonry>` that owns filter state.
- **`/projects/[slug]`** — `generateStaticParams()` over project ids; renders
  one adaptive `<ProjectDetail>`. Unknown slug → `notFound()`.

### Components (new, under `src/components/`)

| Component | Responsibility | Depends on |
| --- | --- | --- |
| `ProjectsMasonry.tsx` (client) | Holds category + tag filter state; renders the CSS-columns masonry; instant client-side filtering with `AnimateIn` fade | `projects` data, `ProjectCard`, `FilterChips` |
| `ProjectCard.tsx` | A single masonry tile: cover image + hover overlay (name, tags); links to `/projects/[slug]` | `Project` |
| `FilterChips.tsx` | Chip row: All · Design · UI/UX · Web Dev · AI Automation (+ active tag); emits selection | — |
| `ProjectDetail.tsx` | Adaptive detail layout: header (name, category, year, role, links) → hero → gallery → description + stack/tags. Empty fields render nothing | `Project`, `Lightbox` |
| `Lightbox.tsx` | Click-to-zoom overlay for gallery images on the detail page | — |

`Nav.tsx` gains a **"Projects"** link to `/projects`.

### Homepage change — `src/app/page.tsx`

Replace the imported `<Projects>` bento with a compact CTA band:
short heading + 3–4 featured covers + **"View all projects →"** linking to
`/projects`. The existing `Projects.tsx` bento component is either repurposed
into this CTA or replaced by a small `ProjectsCTA.tsx`; the full grid logic moves
to `/projects`.

## Content catalog

Backfill all projects from `public/assets/projects/`. Covers and image sets are
wired from the existing folders. Categories below are the starting assignment.

| id | name | category | source folder | links known |
| --- | --- | --- | --- | --- |
| `oneclick` | OneClick | webdev | `one-click-app/` | github + live |
| `n8n-automation` | n8n Automation Flows | ai-automation | `n8n/` | — |
| `grb` | GRB Enterprises Inc. | webdev | `grb/` | live |
| `lotto` | Lotto Platform | uiux | `lotto/` | — |
| `game-ui` | Game UI Design | uiux | `GameUI/` | Behance |
| `moscot` | Character Design — Monsters | design | `Monster/` | Behance |
| `travel-portal` | Travel Portal | uiux | `TravelPortal/` | Behance |
| `rrm` | RRM | webdev | `RRM/` | TBD |
| `real-estate` | Real Estate | uiux | `RealState/` | TBD |
| `logo` | Logo Design | design | `Logo/` | TBD |
| `christmas` | Christmas Branding | design | `Christmas/` | TBD |
| `halloween` | Halloween Art | design | `Halloween/` | TBD |
| `cats` | Cats | design | `Cats/` | TBD |
| `sonic` | Sonic | design | `Sonic/` | TBD |

Exact filenames per folder are verified during implementation. Unknown metadata
(RRM/Real Estate descriptions, missing external links) stays empty — the
adaptive template handles absent fields, so it does not block launch. Final
category assignments and display names are Raffy's call during data entry.

## Styling

- Tailwind v4 semantic tokens only — `var(--color-bg-surface)`,
  `var(--color-border)`, `var(--color-text-primary)`, etc. **No** hardcoded hex
  or `white/10`-style values (per project `CLAUDE.md`).
- Theme-aware (light/dark) via existing token system.
- Reuse `AnimateIn` for scroll/filter fade-ins; add `.no-theme-transition`
  where Framer Motion and theme CSS transitions could conflict.
- Cards: `rounded-2xl`, `border-[var(--color-border)]`, `bg-surface`, hover
  overlay matching the current bento card treatment.

## Error & edge handling

- `/projects/[slug]` with an unknown id → `notFound()` (404).
- Projects with a single image render a clean one-image gallery (no broken grid).
- Missing `cover` falls back to the gradient placeholder already used in the
  current bento grid.
- Filter with zero matches shows a short empty-state message.

## Out of scope (YAGNI)

- MDX / long-form case-study authoring (fields exist but unused for now).
- CMS or DB-backed projects (data stays in `projects.ts`).
- Search, pagination, sorting beyond category + tag filtering.

## Success criteria

1. `/projects` renders a masonry wall of all 14 projects with working
   category + tag filters.
2. Every project has a shareable `/projects/[slug]` detail page that adapts to
   the data present.
3. Homepage `<Projects>` bento is replaced by a CTA linking to `/projects`;
   Nav links to it.
4. Light/dark themes both look correct; no hardcoded color values introduced.
5. `npm run build` and `npm run lint` pass.
