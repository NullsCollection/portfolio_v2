"use client";

import { Sparkles } from "lucide-react";

/**
 * "Ask AI about this" trigger. Dispatches an `ask-ai` CustomEvent that the
 * global ChatWidget listens for — it opens the panel and auto-sends the question.
 *
 * - `chip`: small icon button overlaid on project card images
 * - `button`: labeled pill for the project detail page
 */
export function AskAIButton({
  projectName,
  question,
  label = "Ask AI about this project",
  variant = "chip",
  className = "",
}: {
  projectName?: string;
  /** Overrides the default "Tell me about {projectName}" question */
  question?: string;
  /** Text for the `button` variant */
  label?: string;
  variant?: "chip" | "button";
  className?: string;
}) {
  const subject = projectName ?? "Raffy";
  const handleClick = (e: React.MouseEvent) => {
    // Cards are links — don't navigate, just open the chat
    e.preventDefault();
    e.stopPropagation();
    window.dispatchEvent(
      new CustomEvent("ask-ai", {
        detail: { question: question ?? `Tell me about ${subject}` },
      }),
    );
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--color-border)] bg-surface px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-[var(--color-border-strong)] ${className}`}
      >
        <Sparkles className="h-4 w-4 text-text-accent" aria-hidden="true" />
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Ask AI about this"
      aria-label={`Ask AI about ${subject}`}
      className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-black/50 text-white/70 backdrop-blur-sm transition-colors hover:text-white ${className}`}
    >
      <Sparkles className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
