# AGENT.md — nullscollection.art Portfolio Overhaul

> This file is the single source of truth for any AI agent (Claude, Cursor, Copilot, etc.) working on this codebase. Read it fully before making any changes.

---

## 1. Project Identity

**Owner:** Raffy Francisco (NullzCollection)
**Site:** https://www.nullscollection.art
**Purpose:** Personal portfolio — Web Developer | AI Automation & Graphic Designer
**Contact:** raffy7792@gmail.com
**Status:** Available for freelance & full-time remote

### Brand Voice

- Confident but not arrogant
- Technical but readable by non-developers
- Short, punchy sentences in UI copy
- No buzzwords ("synergy", "leverage", "innovative")
- First-person on the About page, third-person on meta/SEO descriptions

---

## 2. Design System

### Visual Reference

- **UI feel:** Google Stitch (https://stitch.withgoogle.com) — dark dot-grid canvas, floating light panels, clean editor aesthetic
- **Layout reference:** Elias Leguizamon (https://eliasleguizamon.vercel.app) — minimal, section-based, linear scroll
- **Color palette (from OneClick branding, reused here):**

| Token               | Hex       | Use                                |
| ------------------- | --------- | ---------------------------------- |
| `--color-primary`   | `#000000` | Text, borders, dark surfaces       |
| `--color-secondary` | `#4F46E5` | Accent, interactive, highlights    |
| `--color-tertiary`  | `#22D3EE` | Tags, badges, code labels          |
| `--color-neutral`   | `#0F172A` | Background base                    |
| `--color-surface`   | `#1E293B` | Cards, panels                      |
| `--color-muted`     | `#64748B` | Secondary text                     |
| `--color-white`     | `#FFFFFF` | Card content, primary text on dark |

### Typography

- **Font:** Inter (Google Fonts)
- **Headings:** `font-weight: 600`, letter-spacing: `-0.02em`
- **Body:** `font-weight: 400`, `line-height: 1.7`
- **Labels/badges:** `font-size: 12px`, `font-weight: 500`
- **Scale (mobile-first):** `text-sm / text-base / text-xl / text-3xl / text-5xl`

### Spacing

- Base unit: `4px`
- Section padding: `py-24` (96px)
- Container max-width: `max-w-4xl` (896px), centered
- Card gap: `gap-6`

### Components

- Cards: `bg-[--color-surface] border border-white/10 rounded-xl`
- Tags/badges: `bg-[--color-tertiary]/10 text-[--color-tertiary] rounded-full px-3 py-1 text-xs`
- Buttons (primary): `bg-[--color-secondary] text-white rounded-lg px-6 py-3`
- Buttons (ghost): `border border-white/20 text-white rounded-lg px-6 py-3 hover:bg-white/5`

---

## 3. Tech Stack

| Layer      | Tool                                              |
| ---------- | ------------------------------------------------- |
| Framework  | Next.js 15 (App Router)                           |
| Language   | TypeScript                                        |
| Styling    | Tailwind CSS v4                                   |
| Animations | Framer Motion                                     |
| Database   | Supabase (for AI chat logs, contact form)         |
| AI         | Anthropic Claude API (`claude-sonnet-4-20250514`) |
| Deployment | Vercel                                            |
| Analytics  | Vercel Analytics                                  |
| Icons      | Lucide React                                      |
| Font       | `next/font` with Inter                            |

---

## 4. Site Architecture

```
app/
├── page.tsx              ← Main single-page portfolio
├── layout.tsx            ← Root layout, meta, fonts
├── api/
│   └── chat/
│       └── route.ts      ← Claude AI chat endpoint (rate-limited)
├── components/
│   ├── Hero.tsx
│   ├── Experience.tsx
│   ├── Projects.tsx
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── ChatWidget.tsx    ← Floating AI chat panel
│   └── ui/
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Card.tsx
├── data/
│   ├── experience.ts     ← Work history data
│   ├── projects.ts       ← Portfolio projects data
│   └── ai-context.ts     ← System prompt / bio for AI chat
└── lib/
    ├── anthropic.ts      ← Anthropic client setup
    └── supabase.ts       ← Supabase client setup
```

### Routes

- `/` — Full single-page portfolio
- `/api/chat` — POST endpoint for AI chat

---

## 5. Page Sections (in order)

### 5.1 Hero

- Availability badge: "Available for Freelance & Full-Time (Remote)"
- Name: `Raffy Francisco`
- Role: `Web Developer & Graphic Designer`
- 1–2 sentence tagline
- Two CTAs: `View My Work` (scroll to Projects) + `Download CV`
- GitHub + LinkedIn + Telegram links (icon only)
- **NO profile photo** — keep it minimal like Elias

### 5.2 Experience

- Numbered timeline list (like Elias)
- Each entry: `[year range] / [Role] / [Company]` + 1 sentence description + company link
- Entries (newest first):
  1. 2025–Present | Web Designer/Developer – Freelance | KitCode
  2. 2023–2025 | Graphic Designer – Full-time | Zeinous
  3. 2021–2023 | Graphic Designer – Full-time | BGK Printing Services

### 5.3 Projects

- Card grid (2 cols desktop, 1 col mobile)
- Each card: project name, 1-line description, tech tags, GitHub link, live link (if any)
- Load from `data/projects.ts`
- "View All Projects" → GitHub profile

### 5.4 About

- Short 3–4 sentence bio (from existing site, condensed)
- Specializations as icon + label pills (no big blocks of text)
- Skill tags grouped by: Design / Frontend / Tools

### 5.5 Contact

- Simple form: Name, Email, Message → Supabase table `contact_submissions`
- Social links: Telegram, Email, GitHub, LinkedIn
- AI chat trigger button: "Chat with my AI assistant →"

---

## 6. AI Chat Feature

### Purpose

A lightweight conversational widget that lets visitors ask questions about Raffy — his skills, availability, projects, and how to hire him.

### UI

- Floating button: bottom-right, `💬` icon, subtle pulse animation
- Expands to a panel: `w-80 h-96`, dark card with dot-grid bg, white message bubbles
- Google Stitch-style: feels like an AI-native product tool, not a support chat

### API Route: `/api/chat`

```typescript
// POST /api/chat
// Body: { messages: { role: 'user' | 'assistant', content: string }[] }
// Returns: { reply: string }
```

- Rate limit: 10 requests per IP per hour (use Upstash or Vercel KV)
- Key: `ANTHROPIC_API_KEY` in environment (never exposed to client)
- Model: `claude-sonnet-4-20250514`
- Max tokens: `512`
- Temperature: default

### System Prompt (in `data/ai-context.ts`)

```
You are an AI assistant for Raffy Francisco (NullzCollection), a Filipino Web Developer and Graphic Designer based remotely.

Answer questions about Raffy concisely and helpfully. You can share:
- His skills: React, TypeScript, Tailwind CSS, Next.js, Figma, Adobe Illustrator
- His availability: Open to freelance and full-time remote roles
- His contact: raffy7792@gmail.com or Telegram +63 960 072 3886
- His projects: OneClick (SaaS posting automation), freelance web development work
- His experience: KitCode (2025), Zeinous (2023–2025), BGK Printing (2021–2023)

If asked something you don't know, say: "I'm not sure — reach out directly at raffy7792@gmail.com."
Keep replies to 2–4 sentences max. Be warm, direct, and professional.
```

---

## 7. Build Phases

### Phase 1 — Foundation

- [ ] Init Next.js 15 + TypeScript + Tailwind v4
- [ ] Set up design tokens (CSS variables)
- [ ] Root layout: Inter font, dark background, dot-grid pattern
- [ ] Responsive shell with section anchors

### Phase 2 — Sections + Content

- [ ] Hero section
- [ ] Experience timeline
- [ ] Projects grid (hardcoded data first)
- [ ] About section
- [ ] Contact form → Supabase
- [ ] Framer Motion: scroll-triggered fade-in per section

### Phase 3 — AI Chat

- [ ] `/api/chat` route with Claude API
- [ ] Rate limiting
- [ ] ChatWidget component (floating button + panel)
- [ ] Message history (in-memory per session only)
- [ ] Log conversations to Supabase `chat_logs` table

### Phase 4 — Polish + Deploy

- [ ] SEO: meta tags, OG image, robots.txt, sitemap
- [ ] Performance: image optimization, lazy load
- [ ] Vercel deployment + custom domain
- [ ] Vercel Analytics enabled

---

## 8. Agent Rules

### Always

- Use TypeScript strictly — no `any`
- Use Tailwind utility classes — no custom CSS files unless for keyframes
- Keep components small and single-responsibility
- Use `data/` files as the source of truth for content — never hardcode in JSX
- Server Components by default; use `'use client'` only when needed (event handlers, animations)

### Never

- Never expose `ANTHROPIC_API_KEY` on the client
- Never use inline styles unless absolutely necessary
- Never use `px` for font sizes — use Tailwind scale
- Never add unnecessary npm packages — check if Tailwind or native browser APIs cover it first
- Never make the page look like a template — every design decision should feel intentional

### Naming Conventions

- Components: PascalCase (`HeroSection.tsx`)
- Utilities/hooks: camelCase (`useScrollProgress.ts`)
- Data files: camelCase (`projects.ts`)
- CSS variables: kebab-case (`--color-secondary`)
- Tailwind config extensions: kebab-case

### Git Commits

Follow conventional commits:

- `feat:` new section or feature
- `fix:` bug fix
- `style:` visual/CSS changes only
- `chore:` config, deps, tooling
- `content:` copy/data changes only

---

## 9. Environment Variables

```env
# .env.local
ANTHROPIC_API_KEY=sk-...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...  # server-side only
```

---

## 10. Known Decisions & Rationale

| Decision                     | Reason                                                  |
| ---------------------------- | ------------------------------------------------------- |
| Single-page layout           | Matches Elias reference — simple, scannable             |
| No profile photo in hero     | Keeps it minimal and design-forward                     |
| Inter font                   | Matches OneClick brand + Google Stitch aesthetic        |
| Claude Sonnet (not Haiku)    | Better conversational quality for client-facing chat    |
| Supabase for logs            | Already familiar, zero cold-start, free tier sufficient |
| App Router (not Pages)       | Modern Next.js, better server component support         |
| Framer Motion (not CSS only) | Scroll-triggered animations need JS; FM is the standard |

---

## 11. Canvas Mode — Implementation Plan

### Concept
The desktop layout is an **infinite pannable canvas** (Stitch / n8n aesthetic). All content lives as floating draggable nodes on the dot-grid. No page scroll on desktop. Positions reset on browser refresh (React state only — no persistence). Mobile (`< md`) falls back to the normal scroll layout.

### Behaviour Rules
- **Pan:** click + drag on empty canvas space → moves the viewport
- **Move node:** click + drag on any node → repositions that node; canvas does NOT pan
- **No zoom** — pan only
- **Refresh** → all nodes snap back to `defaultLayout` positions
- **Reset Layout button** in Nav → same as refresh but without reloading
- **Nav** stays fixed outside the canvas at all times
- **ChatWidget** stays fixed outside the canvas at all times

### Responsive Strategy
| Breakpoint | Behaviour |
|---|---|
| `< md` (< 768px) | Normal scroll layout — existing section order, AnimateIn animations |
| `≥ md` (≥ 768px) | Canvas mode — infinite pan, draggable nodes, no scroll |

---

### New Files

#### `src/components/canvas/Canvas.tsx`
- `'use client'`
- Full-viewport fixed container (`position: fixed, inset: 0`)
- Tracks `panX`, `panY` in state
- `onPointerDown` on the background layer initiates pan
- Applies `transform: translate(panX px, panY px)` to inner content layer
- Cursor: `default` → `grab` on bg hover → `grabbing` while panning
- Renders all `CanvasNode` children inside the transformed layer

#### `src/components/canvas/CanvasNode.tsx`
- `'use client'`
- Framer Motion `motion.div` with `drag` enabled
- `onPointerDown`: calls `e.stopPropagation()` — prevents canvas pan from firing
- Accepts `id`, `defaultX`, `defaultY`, `children`
- Position driven by Framer `x`/`y` motion values initialised from `defaultLayout`
- Visual: subtle `ring-1 ring-white/0 hover:ring-white/10` border on hover to hint draggability
- Cursor: `grab` → `grabbing` while dragging

#### `src/data/canvas-layout.ts`
Default `{ x, y }` positions for every node (canvas coordinate space).
Node IDs and approximate default layout:

```
hero-badge        { x: 80,   y: 80  }
hero-intro        { x: 80,   y: 140 }
hero-cta          { x: 80,   y: 340 }
hero-socials      { x: 80,   y: 420 }

exp-heading       { x: 680,  y: 80  }
exp-1             { x: 680,  y: 160 }
exp-2             { x: 680,  y: 320 }
exp-3             { x: 680,  y: 480 }

projects-heading  { x: 80,   y: 560 }
project-oneclick  { x: 80,   y: 640 }
project-portfolio { x: 460,  y: 640 }

about-bio         { x: 680,  y: 640 }
about-specs       { x: 680,  y: 840 }
about-skills      { x: 680,  y: 960 }

contact-form      { x: 80,   y: 960 }
contact-socials   { x: 80,   y: 1200 }
```

---

### Modified Files

#### `src/app/page.tsx`
- Import `Canvas` + `CanvasNode`
- Desktop: render `<Canvas>` with all `<CanvasNode>` children (one per node ID above)
- Mobile: render existing scroll layout as-is (use `md:hidden` / `hidden md:block`)
- Remove `AnimateIn` wrappers from canvas nodes (not needed — elements are already visible)
- Keep `AnimateIn` in the mobile scroll layout

#### `src/components/Nav.tsx`
- Add `Reset Layout` button (ghost style, small)
- On click: dispatches a custom event `reset-canvas-layout` that `Canvas.tsx` listens for
- Button only visible on `md:` and above

#### `src/app/globals.css`
Add cursor utility classes:
```css
.cursor-grab   { cursor: grab; }
.cursor-grabbing { cursor: grabbing; }
```

---

### Component Breakdown — What Each Node Renders

| Node ID | Extracted from | Contents |
|---|---|---|
| `hero-badge` | `Hero.tsx` | Availability badge only |
| `hero-intro` | `Hero.tsx` | H1 name + H2 role + tagline |
| `hero-cta` | `Hero.tsx` | "View My Work" + "Download CV" buttons |
| `hero-socials` | `Hero.tsx` | GitHub + LinkedIn + WhatsApp icons |
| `exp-heading` | `Experience.tsx` | Section label + "Experience" h2 |
| `exp-1` | `Experience.tsx` | KitCode entry card |
| `exp-2` | `Experience.tsx` | Zeinous entry card |
| `exp-3` | `Experience.tsx` | BGK Printing entry card |
| `projects-heading` | `Projects.tsx` | Section label + "Projects" h2 + "View all" link |
| `project-oneclick` | `Projects.tsx` | OneClick project card |
| `project-portfolio` | `Projects.tsx` | Portfolio v2 project card |
| `about-bio` | `About.tsx` | Bio paragraphs only |
| `about-specs` | `About.tsx` | 4 specialization pills |
| `about-skills` | `About.tsx` | Skill groups (Design / Frontend / Tools) |
| `contact-form` | `Contact.tsx` | Name + Email + Message form |
| `contact-socials` | `Contact.tsx` | Social links + AI chat CTA |

Hero.tsx, Experience.tsx, Projects.tsx, About.tsx, Contact.tsx will each be **split into sub-components** that the canvas nodes consume individually.

---

### Build Order

1. `canvas-layout.ts` — define all default positions
2. `CanvasNode.tsx` — draggable wrapper (no canvas yet, test in isolation)
3. `Canvas.tsx` — pan container + reset event listener
4. Split Hero → `HeroBadge`, `HeroIntro`, `HeroCTA`, `HeroSocials`
5. Split Experience → `ExperienceHeading`, `ExperienceEntry`
6. Split Projects → `ProjectsHeading`, `ProjectCard`
7. Split About → `AboutBio`, `AboutSpecs`, `AboutSkills`
8. Split Contact → `ContactForm`, `ContactSocials`
9. Rebuild `page.tsx` with canvas nodes (desktop) + scroll layout (mobile)
10. Wire `Reset Layout` into Nav
11. CSS cursor polish
