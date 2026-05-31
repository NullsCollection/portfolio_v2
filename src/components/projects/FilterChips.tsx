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
    <div role="group" aria-label={ariaLabel} className="flex flex-wrap gap-2">
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
                : "border-[var(--color-border)] bg-surface text-muted hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)]",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
