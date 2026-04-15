# Dark / Light Mode — Implementation Spec

> Single source of truth for theming.
> Stack: Next.js 15 App Router · Tailwind CSS v4 · next-themes · CSS custom properties.

---

## 1. Architecture Overview

### CSS File Separation

```
src/
├── app/
│   └── globals.css          ← @theme{} raw scales + font + base styles + utilities + keyframes
│                               NO semantic theme values — only structure
├── styles/
│   ├── dark-theme.css       ← [data-theme="dark"]  { all dark semantic tokens }
│   └── light-theme.css      ← [data-theme="light"] { all light semantic tokens }
└── components/
    ├── ThemeProvider.tsx     ← next-themes wrapper (enableSystem: true)
    └── ThemeToggle.tsx       ← 3-state subtle toggle: system → light → dark → system
```

### How It Works at Runtime

```
1. Browser loads page
2. next-themes injects a blocking <script> before first paint
3. Script reads localStorage → if no saved preference, reads prefers-color-scheme
4. Sets data-theme="dark" or data-theme="light" on <html>
5. CSS cascade: [data-theme="dark"] or [data-theme="light"] tokens activate
6. Tailwind utilities (bg-bg-base, text-text-primary, etc.) resolve via var(--token)
7. React hydrates — no flash, no mismatch
```

### Key Design Decisions

| Concern                                              | Decision                                 | Reason                                                                           |
| ---------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------- |
| CSS separated from globals                           | `dark-theme.css` + `light-theme.css`     | Theme values shouldn't pollute global structure                                  |
| `@theme{}` has stub defaults                         | Dark values as fallback                  | Tailwind needs values in `@theme` to generate utility class names                |
| Theme files override via `[data-theme]`              | CSS specificity wins over `:root`        | Clean cascade, no JS needed per-component                                        |
| `enableSystem: true`                                 | Auto-detect OS preference on first visit | User's first experience matches their OS; they can override manually             |
| `defaultTheme: "system"`                             | Resolves from `prefers-color-scheme`     | No hardcoded dark default — respects user environment                            |
| 3-state toggle                                       | system / light / dark                    | Lets users return to auto mode after manual override                             |
| `disableTransitionOnChange: false` + CSS transitions | Smooth theme switch animation            | 150ms fade on bg/text/border; transforms excluded so Framer Motion is unaffected |

---

## 2. Color Scales (Raw Primitives)

Static values that live in `@theme{}` in `globals.css`. Never reference these directly in components — use semantic tokens instead.

### Primary Scale — Neutral Charcoal (derived from `#202124`)

| Token                 | Value     | Role                             |
| --------------------- | --------- | -------------------------------- |
| `--color-primary-50`  | `#f8f9fa` | Light mode base bg               |
| `--color-primary-100` | `#f1f3f5` | Light mode input bg              |
| `--color-primary-200` | `#e2e6eb` | Light mode borders               |
| `--color-primary-300` | `#c5ccd6` | Light mode border strong         |
| `--color-primary-400` | `#96a1b0` | Existing `--color-muted` value   |
| `--color-primary-500` | `#64748b` | Muted text (both themes)         |
| `--color-primary-600` | `#475569` | Secondary text in light mode     |
| `--color-primary-700` | `#2d3748` | Dark slate                       |
| `--color-primary-800` | `#303134` | Existing `--color-surface` value |
| `--color-primary-850` | `#2a2b2e` | Chat input bg                    |
| `--color-primary-900` | `#202124` | Dark mode base bg                |
| `--color-primary-950` | `#17181b` | Deepest dark                     |

### Accent Scale — Indigo (current `--color-secondary: #4f46e5`)

| Token                | Value     | Role                         |
| -------------------- | --------- | ---------------------------- |
| `--color-accent-50`  | `#eef2ff` | Light mode accent tint       |
| `--color-accent-100` | `#e0e7ff` |                              |
| `--color-accent-200` | `#c7d2fe` |                              |
| `--color-accent-300` | `#a5b4fc` |                              |
| `--color-accent-400` | `#818cf8` |                              |
| `--color-accent-500` | `#6366f1` | Hover on dark bg             |
| `--color-accent-600` | `#4f46e5` | Primary accent (both themes) |
| `--color-accent-700` | `#4338ca` | Hover on light bg            |
| `--color-accent-800` | `#3730a3` |                              |
| `--color-accent-900` | `#312e81` |                              |
| `--color-accent-950` | `#1e1b4b` |                              |

### Tertiary Scale — Cyan (current `--color-tertiary: #22d3ee`)

| Token                  | Value     | Role                   |
| ---------------------- | --------- | ---------------------- |
| `--color-tertiary-400` | `#22d3ee` | Tags/badges on dark bg |
| `--color-tertiary-600` | `#0891b2` | Readable on white      |
| `--color-tertiary-700` | `#0e7490` | Tag text on light bg   |

---

## 3. Semantic Token Map

These are the values that change between themes. They live exclusively in `dark-theme.css` and `light-theme.css`.

### Backgrounds

| Token                 | Dark      | Light     |
| --------------------- | --------- | --------- |
| `--color-bg-base`     | `#202124` | `#f8f9fa` |
| `--color-bg-surface`  | `#303134` | `#ffffff` |
| `--color-bg-input`    | `#2a2b2e` | `#f1f3f5` |
| `--color-bg-elevated` | `#303134` | `#ffffff` |

### Text

| Token                    | Dark      | Light                                         |
| ------------------------ | --------- | --------------------------------------------- |
| `--color-text-primary`   | `#ffffff` | `#202124`                                     |
| `--color-text-secondary` | `#96a1b0` | `#475569`                                     |
| `--color-text-muted`     | `#64748b` | `#64748b` ← same, sufficient contrast on both |
| `--color-text-accent`    | `#4f46e5` | `#4f46e5` ← same                              |
| `--color-text-tertiary`  | `#22d3ee` | `#0e7490` ← darkened for light bg readability |

### Borders

| Token                   | Dark                     | Light     |
| ----------------------- | ------------------------ | --------- |
| `--color-border`        | `rgba(255,255,255,0.10)` | `#e2e6eb` |
| `--color-border-subtle` | `rgba(255,255,255,0.05)` | `#f1f3f5` |
| `--color-border-strong` | `rgba(255,255,255,0.20)` | `#c5ccd6` |

### Navigation

| Token                   | Dark                     | Light     |
| ----------------------- | ------------------------ | --------- |
| `--color-navbar-bg`     | `#202124`                | `#f8f9fa` |
| `--color-navbar-border` | `rgba(255,255,255,0.10)` | `#e2e6eb` |

### Accent / Interactive

| Token                   | Dark                                           | Light                                          |
| ----------------------- | ---------------------------------------------- | ---------------------------------------------- |
| `--color-accent`        | `#4f46e5`                                      | `#4f46e5`                                      |
| `--color-accent-hover`  | `#6366f1`                                      | `#4338ca`                                      |
| `--color-accent-subtle` | `color-mix(in srgb, #4f46e5 10%, transparent)` | `color-mix(in srgb, #4f46e5 10%, transparent)` |

### Existing Tokens (need light overrides)

These already exist in `@theme` and generate Tailwind utilities (`bg-surface`, `text-muted`, etc.).
Override them in theme files — **no component class changes needed**.

| Token               | Dark      | Light                 |
| ------------------- | --------- | --------------------- |
| `--color-surface`   | `#303134` | `#ffffff`             |
| `--color-muted`     | `#96a1b0` | `#64748b`             |
| `--color-secondary` | `#4f46e5` | `#4f46e5` (no change) |
| `--color-tertiary`  | `#22d3ee` | `#0e7490`             |

### Status

| Token                       | Dark                     | Light                  |
| --------------------------- | ------------------------ | ---------------------- |
| `--color-status-success`    | `#34d399`                | `#059669`              |
| `--color-status-success-bg` | `rgba(52,211,153,0.05)`  | `rgba(5,150,105,0.08)` |
| `--color-status-error`      | `#f87171`                | `#dc2626`              |
| `--color-status-error-bg`   | `rgba(248,113,113,0.05)` | `rgba(220,38,38,0.08)` |

### Misc

| Token                 | Dark                     | Light                  |
| --------------------- | ------------------------ | ---------------------- |
| `--color-dot-grid`    | `rgba(255,255,255,0.07)` | `rgba(0,0,0,0.05)`     |
| `--color-scrollbar`   | `rgba(255,255,255,0.10)` | `rgba(0,0,0,0.15)`     |
| `--color-shadow-card` | `rgba(79,70,229,0.07)`   | `rgba(79,70,229,0.10)` |

---

## 4. Implementation Steps

### Step 1 — Install next-themes

```bash
npm install next-themes
```

---

### Step 2 — `src/app/globals.css` (global tokens only)

Imports tailwindcss + theme files. `@theme{}` holds raw scales + semantic stubs (dark values as CSS fallback for utility generation). No light/dark semantic values here.

```css
/* ─── Imports ──────────────────────────────────────────────────────────────── */
@import "tailwindcss";
@import "../styles/dark-theme.css";
@import "../styles/light-theme.css";

/* ─── Design Tokens ─────────────────────────────────────────────────────────── */
/* Raw color scales: STATIC — palette references only, not theme-specific        */
/* Semantic stubs: dark values as fallback, overridden at runtime by theme files */
@theme {
  /* Primary / Neutral scale */
  --color-primary-50: #f8f9fa;
  --color-primary-100: #f1f3f5;
  --color-primary-200: #e2e6eb;
  --color-primary-300: #c5ccd6;
  --color-primary-400: #96a1b0;
  --color-primary-500: #64748b;
  --color-primary-600: #475569;
  --color-primary-700: #2d3748;
  --color-primary-800: #303134;
  --color-primary-850: #2a2b2e;
  --color-primary-900: #202124;
  --color-primary-950: #17181b;

  /* Accent / Indigo scale */
  --color-accent-50: #eef2ff;
  --color-accent-100: #e0e7ff;
  --color-accent-200: #c7d2fe;
  --color-accent-300: #a5b4fc;
  --color-accent-400: #818cf8;
  --color-accent-500: #6366f1;
  --color-accent-600: #4f46e5;
  --color-accent-700: #4338ca;
  --color-accent-800: #3730a3;
  --color-accent-900: #312e81;
  --color-accent-950: #1e1b4b;

  /* Tertiary / Cyan scale */
  --color-tertiary-400: #22d3ee;
  --color-tertiary-600: #0891b2;
  --color-tertiary-700: #0e7490;

  /* ── Existing semantic tokens (dark stubs for Tailwind utility generation) ── */
  --color-secondary: #4f46e5;
  --color-tertiary: #22d3ee;
  --color-surface: #303134;
  --color-muted: #96a1b0;

  /* ── New semantic tokens (dark stubs for Tailwind utility generation) ─────── */
  /* Backgrounds */
  --color-bg-base: #202124;
  --color-bg-surface: #303134;
  --color-bg-input: #2a2b2e;
  --color-bg-elevated: #303134;

  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #96a1b0;
  --color-text-muted: #64748b;
  --color-text-accent: #4f46e5;
  --color-text-tertiary: #22d3ee;

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-subtle: rgba(255, 255, 255, 0.05);
  --color-border-strong: rgba(255, 255, 255, 0.2);

  /* Navigation */
  --color-navbar-bg: #202124;
  --color-navbar-border: rgba(255, 255, 255, 0.1);

  /* Accent */
  --color-accent: #4f46e5;
  --color-accent-hover: #6366f1;
  --color-accent-subtle: color-mix(in srgb, #4f46e5 10%, transparent);

  /* Status */
  --color-status-success: #34d399;
  --color-status-success-bg: rgba(52, 211, 153, 0.05);
  --color-status-error: #f87171;
  --color-status-error-bg: rgba(248, 113, 113, 0.05);

  /* Misc */
  --color-dot-grid: rgba(255, 255, 255, 0.07);
  --color-scrollbar: rgba(255, 255, 255, 0.1);
  --color-shadow-card: rgba(79, 70, 229, 0.07);

  /* Font */
  --font-sans: var(--font-inter);
}

/* ─── Base Styles ────────────────────────────────────────────────────────────── */
body {
  background-color: var(--color-bg-base);
  color: var(--color-text-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Smooth theme transitions — bg/text/border only, excludes transforms/opacity */
/* disableTransitionOnChange in ThemeProvider prevents flash on initial load    */
*,
*::before,
*::after {
  transition-property: background-color, border-color, color, fill, stroke;
  transition-duration: 150ms;
  transition-timing-function: ease;
}

/* Applied to canvas drag nodes + Framer Motion elements to prevent interference */
.no-theme-transition,
.no-theme-transition * {
  transition: none !important;
}

/* ─── Utilities ──────────────────────────────────────────────────────────────── */
.dot-grid {
  background-image: radial-gradient(
    circle,
    var(--color-dot-grid) 1px,
    transparent 1px
  );
  background-size: 16px 16px;
}

.cursor-grab {
  cursor: grab;
}
.cursor-grabbing {
  cursor: grabbing;
}

.chat-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--color-scrollbar) transparent;
}
.chat-scroll::-webkit-scrollbar {
  width: 4px;
}
.chat-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.chat-scroll::-webkit-scrollbar-thumb {
  background-color: var(--color-scrollbar);
  border-radius: 2px;
}

/* ─── Keyframes ──────────────────────────────────────────────────────────────── */
@keyframes ping-slow {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  80%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@keyframes pulse-soft {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
.animate-pulse-soft {
  animation: pulse-soft 2s ease-in-out infinite;
}
```

---

### Step 3 — `src/styles/dark-theme.css`

All dark semantic tokens. next-themes sets `data-theme="dark"` on `<html>`.

```css
/* ─── Dark Theme ─────────────────────────────────────────────────────────────── */
/* Activated when: data-theme="dark" on <html>                                    */
/* Default: yes — matches original design and most users' OS preference at night  */

[data-theme="dark"] {
  /* Existing tokens */
  --color-secondary: #4f46e5;
  --color-tertiary: #22d3ee;
  --color-surface: #303134;
  --color-muted: #96a1b0;

  /* Backgrounds */
  --color-bg-base: #202124;
  --color-bg-surface: #303134;
  --color-bg-input: #2a2b2e;
  --color-bg-elevated: #303134;

  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #96a1b0;
  --color-text-muted: #64748b;
  --color-text-accent: #4f46e5;
  --color-text-tertiary: #22d3ee;

  /* Borders */
  --color-border: rgba(255, 255, 255, 0.1);
  --color-border-subtle: rgba(255, 255, 255, 0.05);
  --color-border-strong: rgba(255, 255, 255, 0.2);

  /* Navigation */
  --color-navbar-bg: #202124;
  --color-navbar-border: rgba(255, 255, 255, 0.1);

  /* Accent */
  --color-accent: #4f46e5;
  --color-accent-hover: #6366f1;
  --color-accent-subtle: color-mix(in srgb, #4f46e5 10%, transparent);

  /* Status */
  --color-status-success: #34d399;
  --color-status-success-bg: rgba(52, 211, 153, 0.05);
  --color-status-error: #f87171;
  --color-status-error-bg: rgba(248, 113, 113, 0.05);

  /* Misc */
  --color-dot-grid: rgba(255, 255, 255, 0.07);
  --color-scrollbar: rgba(255, 255, 255, 0.1);
  --color-shadow-card: rgba(79, 70, 229, 0.07);
}
```

---

### Step 4 — `src/styles/light-theme.css`

All light semantic tokens. next-themes sets `data-theme="light"` on `<html>`.

```css
/* ─── Light Theme ────────────────────────────────────────────────────────────── */
/* Activated when: data-theme="light" on <html>                                   */
/* Targets: users with OS light preference, or manual toggle to light             */

[data-theme="light"] {
  /* Existing tokens */
  --color-secondary: #4f46e5;
  --color-tertiary: #0e7490; /* darkened — #22d3ee is too light on white */
  --color-surface: #ffffff;
  --color-muted: #64748b; /* stepped darker — stays readable on light bg */

  /* Backgrounds */
  --color-bg-base: #f8f9fa;
  --color-bg-surface: #ffffff;
  --color-bg-input: #f1f3f5;
  --color-bg-elevated: #ffffff;

  /* Text */
  --color-text-primary: #202124;
  --color-text-secondary: #475569;
  --color-text-muted: #64748b;
  --color-text-accent: #4f46e5;
  --color-text-tertiary: #0e7490;

  /* Borders */
  --color-border: #e2e6eb;
  --color-border-subtle: #f1f3f5;
  --color-border-strong: #c5ccd6;

  /* Navigation */
  --color-navbar-bg: #f8f9fa;
  --color-navbar-border: #e2e6eb;

  /* Accent */
  --color-accent: #4f46e5;
  --color-accent-hover: #4338ca; /* darker hover — needed on light bg */
  --color-accent-subtle: color-mix(in srgb, #4f46e5 10%, transparent);

  /* Status */
  --color-status-success: #059669; /* emerald-600, not emerald-400 — contrast on white */
  --color-status-success-bg: rgba(5, 150, 105, 0.08);
  --color-status-error: #dc2626; /* red-600, not red-400 */
  --color-status-error-bg: rgba(220, 38, 38, 0.08);

  /* Misc */
  --color-dot-grid: rgba(0, 0, 0, 0.05);
  --color-scrollbar: rgba(0, 0, 0, 0.15);
  --color-shadow-card: rgba(79, 70, 229, 0.1);
}
```

---

### Step 5 — `src/components/ThemeProvider.tsx`

```tsx
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme" // → sets data-theme="light" | "dark" on <html>
      defaultTheme="system" // → reads prefers-color-scheme on first visit
      enableSystem // → auto-detects OS preference
      disableTransitionOnChange // → prevents FOUC on initial theme resolution;
      //   CSS transitions in globals.css handle manual toggle
    >
      {children}
    </NextThemesProvider>
  );
}
```

---

### Step 6 — `src/app/layout.tsx`

Add `ThemeProvider` wrapper and `suppressHydrationWarning` to `<html>`.

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning // ← required: next-themes mutates data-theme during hydration
    >
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

---

### Step 7 — `src/components/ThemeToggle.tsx`

3-state cycle: **system → light → dark → system**

- **System** — Monitor icon, tiny accent dot in corner signals "auto" mode
- **Light** — Sun icon
- **Dark** — Moon icon
- Subtle design: no border at rest, hover shows surface bg fill
- Uses `resolvedTheme` for icon display (shows what's actually applied, not "system")

```tsx
"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const CYCLE = ["system", "light", "dark"] as const;
type ThemeValue = (typeof CYCLE)[number];

const CONFIG: Record<ThemeValue, { icon: JSX.Element; label: string }> = {
  system: {
    icon: <Monitor size={14} strokeWidth={1.75} />,
    label: "System (auto)",
  },
  light: {
    icon: <Sun size={14} strokeWidth={1.75} />,
    label: "Light",
  },
  dark: {
    icon: <Moon size={14} strokeWidth={1.75} />,
    label: "Dark",
  },
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Same-size placeholder prevents CLS while JS hydrates
  if (!mounted) {
    return <div className="size-8" aria-hidden="true" />;
  }

  const current = (
    CYCLE.includes(theme as ThemeValue) ? theme : "system"
  ) as ThemeValue;
  const next = CYCLE[(CYCLE.indexOf(current) + 1) % CYCLE.length];
  const { icon, label } = CONFIG[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={`Theme: ${label}`}
      aria-label={`Theme: ${label}. Click for ${CONFIG[next].label}`}
      className="
        group relative inline-flex size-8 items-center justify-center rounded-md
        text-[var(--color-text-secondary)]
        transition-colors duration-150
        hover:bg-[var(--color-bg-surface)]
        hover:text-[var(--color-text-primary)]
        focus-visible:outline-none
        focus-visible:ring-1
        focus-visible:ring-[var(--color-accent)]/40
        focus-visible:ring-offset-1
        focus-visible:ring-offset-[var(--color-bg-base)]
      "
    >
      {icon}

      {/* Accent dot — visible only in system mode to signal "auto" */}
      {current === "system" && (
        <span
          aria-hidden="true"
          className="
            absolute right-1.5 top-1.5
            size-1 rounded-full
            bg-[var(--color-accent)]
          "
        />
      )}
    </button>
  );
}
```

---

### Step 8 — Wire into `src/components/Nav.tsx`

Place `ThemeToggle` in the nav's right action cluster. The toggle is small enough to sit beside existing nav items without visual noise.

```tsx
import { ThemeToggle } from "@/components/ThemeToggle";

// In the right side of Nav JSX:
<div className="flex items-center gap-1">
  <ThemeToggle />
  {/* ...existing nav items */}
</div>;
```

Also replace hardcoded colors in Nav while you're there (see §9 migration table).

---

## 5. Tailwind Utility Reference

Tailwind v4 generates utilities from all `@theme` tokens. Full new utility set:

```
/* Backgrounds */
bg-bg-base          bg-bg-surface       bg-bg-input         bg-bg-elevated

/* Text */
text-text-primary   text-text-secondary text-text-muted
text-text-accent    text-text-tertiary

/* Borders */
border-border       border-border-subtle   border-border-strong

/* Navigation */
bg-navbar-bg        border-navbar-border

/* Accent */
bg-accent           bg-accent-hover

/* Status */
bg-status-success   text-status-success
bg-status-error     text-status-error

/* Existing (theme-aware after override) */
bg-surface          ← #303134 dark / #ffffff light
text-muted          ← #96a1b0 dark / #64748b light
bg-secondary        ← #4f46e5 (both)
text-tertiary       ← #22d3ee dark / #0e7490 light
```

For opacity modifiers on CSS var-based utilities, use the arbitrary value syntax:

```tsx
className = "bg-[var(--color-navbar-bg)]/90"; // ✓ opacity modifier works
className = "border-[var(--color-border)]"; // ✓ direct var reference
```

---

## 6. Hardcoded Value Migration

Replace all hardcoded hex values after theme system is in place. Token handles theme switching automatically.

### `src/app/globals.css`

| Before                              | After                                    |
| ----------------------------------- | ---------------------------------------- |
| `background-color: #202124`         | `background-color: var(--color-bg-base)` |
| `color: #ffffff`                    | `color: var(--color-text-primary)`       |
| `rgba(255,255,255,0.07)` (dot-grid) | `var(--color-dot-grid)`                  |
| `rgba(255,255,255,0.1)` (scrollbar) | `var(--color-scrollbar)`                 |

### `src/components/Nav.tsx`

| Before            | After                                 |
| ----------------- | ------------------------------------- |
| `bg-[#202124]/90` | `bg-[var(--color-navbar-bg)]/90`      |
| `bg-[#202124]/75` | `bg-[var(--color-navbar-bg)]/75`      |
| `border-white/10` | `border-[var(--color-navbar-border)]` |

### `src/components/Hero.tsx`

| Before                                | After                                  |
| ------------------------------------- | -------------------------------------- |
| `bg-emerald-400` / `bg-emerald-500`   | `bg-[var(--color-status-success)]`     |
| `hover:bg-indigo-500`                 | `hover:bg-[var(--color-accent-hover)]` |
| `border-white/10` / `border-white/15` | `border-[var(--color-border)]`         |

### `src/components/Contact.tsx`

| Before                     | After                                 |
| -------------------------- | ------------------------------------- |
| `bg-emerald-500/5`         | `bg-[var(--color-status-success-bg)]` |
| `text-emerald-400`         | `text-[var(--color-status-success)]`  |
| `bg-red-500/5`             | `bg-[var(--color-status-error-bg)]`   |
| `text-red-400`             | `text-[var(--color-status-error)]`    |
| `bg-white/5` (inputs)      | `bg-[var(--color-bg-input)]`          |
| `border-white/10` (inputs) | `border-[var(--color-border)]`        |

### `src/components/ChatWidget.tsx`

| Before                              | After                                 |
| ----------------------------------- | ------------------------------------- |
| `bg-[#202124]/96`                   | `bg-[var(--color-bg-base)]/96`        |
| `bg-[#2a2b2e]`                      | `bg-[var(--color-bg-input)]`          |
| `border-white/10`                   | `border-[var(--color-border)]`        |
| `border-white/20`                   | `border-[var(--color-border-strong)]` |
| `bg-emerald-400` / `bg-emerald-500` | `bg-[var(--color-status-success)]`    |

### `src/components/ui/Button.tsx`

| Before                  | After                                  |
| ----------------------- | -------------------------------------- |
| `ring-offset-[#202124]` | `ring-offset-[var(--color-bg-base)]`   |
| `hover:bg-indigo-500`   | `hover:bg-[var(--color-accent-hover)]` |

### `src/components/ui/Card.tsx`

| Before                          | After                                       |
| ------------------------------- | ------------------------------------------- |
| `rgba(79,70,229,0.07)` (shadow) | `var(--color-shadow-card)`                  |
| `border-white/10`               | `border-[var(--color-border)]`              |
| `hover:border-white/20`         | `hover:border-[var(--color-border-strong)]` |

### `src/app/book/page.tsx`

| Before         | After                          |
| -------------- | ------------------------------ |
| `bg-[#202124]` | `bg-[var(--color-bg-base)]`    |
| `bg-[#303134]` | `bg-[var(--color-bg-surface)]` |

---

## 7. Testing Checklist

### First Load Behavior

- [ ] OS dark preference → site loads dark, no flash
- [ ] OS light preference → site loads light, no flash
- [ ] No `data-theme` in localStorage on first visit → system preference wins
- [ ] No React hydration mismatch warnings in console

### Toggle Behavior

- [ ] Initial state: Monitor icon + accent dot (system mode)
- [ ] Click 1: Sun icon, site switches to light
- [ ] Click 2: Moon icon, site switches to dark
- [ ] Click 3: Monitor icon + dot, back to system mode
- [ ] Theme persists on page refresh (localStorage)

### Visual Spot-checks

- [ ] Dark: matches original site exactly (zero regression)
- [ ] Light: all cards, inputs, nav visible and readable
- [ ] `bg-surface` cards switch between #303134 and #ffffff
- [ ] `.dot-grid` subtle in both themes (not invisible, not harsh)
- [ ] Chat widget panel readable in light mode
- [ ] Contact form success/error banners visible in both themes
- [ ] Availability dot (emerald) uses status token, readable in both

### Accessibility

- [ ] `text-muted` (#64748b on #f8f9fa) — contrast ratio ~4.6:1 ✓ WCAG AA
- [ ] `text-text-primary` (#202124 on #f8f9fa) — contrast ratio ~16:1 ✓
- [ ] Accent (#4f46e5) on white — contrast ratio ~4.9:1 ✓ WCAG AA
- [ ] Toggle `aria-label` describes current state AND next action
- [ ] Focus ring visible on toggle in both themes

---

## 8. File Checklist

```
new    src/styles/dark-theme.css       ← [data-theme="dark"]  { all dark tokens }
new    src/styles/light-theme.css      ← [data-theme="light"] { all light tokens }
new    src/components/ThemeProvider.tsx
new    src/components/ThemeToggle.tsx

edit   src/app/globals.css             ← @theme{} + @import theme files + base styles
edit   src/app/layout.tsx              ← ThemeProvider + suppressHydrationWarning
edit   src/components/Nav.tsx          ← ThemeToggle + tokenize hardcoded colors
edit   src/components/Hero.tsx         ← tokenize hardcoded colors
edit   src/components/ChatWidget.tsx   ← tokenize hardcoded colors
edit   src/components/Contact.tsx      ← tokenize status + input colors
edit   src/components/ui/Button.tsx    ← tokenize ring-offset + hover
edit   src/components/ui/Card.tsx      ← tokenize shadow + border
edit   src/app/book/page.tsx           ← tokenize bg colors
```

**4 new files · 9 edits · 1 new package (`next-themes`)**
