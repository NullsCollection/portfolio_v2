"use client";

import { useEffect, useRef, useState } from "react";

type CopyState = "idle" | "copied" | "failed";

const LABEL: Record<CopyState, string> = {
  idle: "Copy",
  copied: "Copied",
  failed: "Press Ctrl+C",
};

/** Shell command block with a Copy button. Multi-line commands are copied
 *  joined with `&&` so they paste as one runnable line. */
export function CopyCommand({ lines }: { lines: string[] }) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join(" && "));
      setState("copied");
    } catch {
      setState("failed");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1800);
  };

  return (
    <div className="flex items-start gap-3 overflow-hidden rounded-[7px] border border-[var(--color-border-subtle)] bg-[var(--color-bg-input)] py-[11px] pl-[15px] pr-3">
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-pre font-mono text-[12.5px] leading-[1.7] text-[var(--color-text-accent)] [scrollbar-width:none]">
        {lines.join("\n")}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy install command"
        className="shrink-0 cursor-pointer rounded-[5px] border border-[var(--color-border)] px-[11px] py-[3px] text-xs text-text-muted transition-colors hover:border-[var(--color-border-strong)] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
      >
        <span aria-live="polite">{LABEL[state]}</span>
      </button>
    </div>
  );
}
