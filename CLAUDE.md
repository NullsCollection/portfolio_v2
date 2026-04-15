# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

This is Raffy Francisco's personal portfolio site (`nullscollection.art`) — a single-page app with one additional route.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · next-themes

### Routes

- `/` — Single-page portfolio: `Nav → Hero → Experience → Projects → About → Contact` + floating `ChatWidget`
- `/book` — Cal.com embed for scheduling calls (requires `NEXT_PUBLIC_CAL_LINK`)
- `/api/chat` — REST endpoint powering the chat widget (POST only, CORS-guarded)

### Data layer

All site content lives in `src/data/`:

- `projects.ts` — `Project[]` array rendered in the bento grid
- `experience.ts` — work history
- `skills.ts` — skill categories
- `ai-context.ts` — `AI_SYSTEM_PROMPT` for the NuLLs chatbot (hardcoded Raffy's bio/FAQ)

When updating portfolio content, edit these data files — not the component files.

### AI chat (`/api/chat`)

The chat widget (`ChatWidget.tsx`) calls `/api/chat`, which uses **Groq** (not Anthropic) to run `llama-3.3-70b-versatile` with the `AI_SYSTEM_PROMPT` from `ai-context.ts`. Rate limiting uses **Upstash Redis** (sliding window, 10 req/hr per IP). The chatbot persona is "NuLLs".

### Contact form (`src/app/actions/contact.ts`)

Server action that fans out to **Formspree** (primary) and an optional **n8n webhook** (secondary, fire-and-forget). Uses in-memory rate limiting (5 submissions / 10 min per IP).

### Supabase (`src/lib/supabase.ts`)

Two clients: `createClient()` (anon, browser-safe) and `createServiceClient()` (service-role, server-only). Currently imported but not actively used in any page/component — likely reserved for future features.

### Styling conventions

- **Tailwind CSS v4** — configured via `globals.css` `@theme` block, not `tailwind.config.js`
- **Theme system**: `next-themes` with `data-theme` attribute on `<html>`. Dark/light values live in `src/styles/dark-theme.css` and `src/styles/light-theme.css`. `globals.css` holds raw scales + dark stubs in `@theme` for Tailwind utility generation; theme files override at runtime.
- **Token layers**: raw scales (`--color-primary-900`, `--color-accent-600`) are never used directly in components. Always use semantic tokens.
- **Semantic tokens** (use these in components):
  - Backgrounds: `var(--color-bg-base)`, `var(--color-bg-surface)`, `var(--color-bg-input)`, `var(--color-bg-elevated)`
  - Text: `var(--color-text-primary)`, `var(--color-text-secondary)`, `var(--color-text-muted)`
  - Borders: `var(--color-border)`, `var(--color-border-subtle)`, `var(--color-border-strong)`
  - Accent: `var(--color-accent)`, `var(--color-accent-hover)` (for hover states, replaces `hover:bg-indigo-500`)
  - Status: `var(--color-status-success)`, `var(--color-status-success-bg)`, `var(--color-status-error)`, `var(--color-status-error-bg)`
  - Navigation: `var(--color-navbar-bg)`, `var(--color-navbar-border)`
- **Existing Tailwind utilities** (`bg-surface`, `text-muted`, `bg-secondary`, `text-tertiary`) still work — they're backed by CSS vars that the theme files override.
- **Arbitrary Tailwind syntax** for CSS vars: `bg-[var(--color-bg-base)]`, `border-[var(--color-border)]`, `hover:bg-[var(--color-accent-hover)]`
- **Never use** hardcoded hex values (`bg-[#202124]`, `border-white/10`, `hover:bg-indigo-500`, `text-white/60`, `bg-emerald-*`, `bg-red-*`) in components — always map to a semantic token instead.
- **ring-offset** focus rings must use `ring-offset-[var(--color-bg-base)]` not `ring-offset-[#202124]`
- **ThemeToggle** (`src/components/ThemeToggle.tsx`) — 3-state cycle (system → light → dark). Mounted guard prevents hydration mismatch. Placed in the Nav right cluster.
- **ThemeProvider** (`src/components/ThemeProvider.tsx`) wraps the app in `layout.tsx`. `<html>` requires `suppressHydrationWarning`.
- Animations: use `<AnimateIn>` wrapper (`src/components/AnimateIn.tsx`) for scroll-triggered fade-ins. Add `.no-theme-transition` class to elements where Framer Motion and theme CSS transitions could conflict.
