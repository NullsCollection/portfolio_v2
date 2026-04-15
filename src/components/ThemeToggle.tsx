"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const CYCLE = ["system", "light", "dark"] as const;
type ThemeValue = (typeof CYCLE)[number];

const CONFIG: Record<ThemeValue, { icon: React.ReactNode; label: string }> = {
  system: {
    icon: <Monitor size={16} strokeWidth={1.75} />,
    label: "System (auto)",
  },
  light: {
    icon: <Sun size={16} strokeWidth={1.75} />,
    label: "Light",
  },
  dark: {
    icon: <Moon size={16} strokeWidth={1.75} />,
    label: "Dark",
  },
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  // Same-size placeholder prevents CLS while JS hydrates
  if (!mounted)
    return (
      <div
        className="fixed bottom-24 right-5 z-[60] size-10"
        aria-hidden="true"
      />
    );

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
      className="fixed bottom-10 right-5 z-[60] hidden md:flex size-10 items-center justify-center rounded-full bg-[var(--color-bg-surface)] text-[var(--color-text-secondary)] shadow-lg ring-1 ring-[var(--color-border)] transition-all duration-150 hover:scale-110 hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/50 cursor-pointer"
    >
      {icon}

      {/* Accent dot — visible only in system mode */}
      {current === "system" && (
        <span
          aria-hidden="true"
          className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-[var(--color-accent)]"
        />
      )}
    </button>
  );
}
