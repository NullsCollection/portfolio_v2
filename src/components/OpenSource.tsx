import { openSource } from "@/data/open-source";
import { AnimateIn } from "./AnimateIn";
import { AskAIButton } from "./AskAIButton";
import { Band } from "./Band";
import { CopyCommand } from "./CopyCommand";

/**
 * Proof you can run: one raised card per repo with the pitch, an install
 * command to paste, the facts, and the source link.
 */
export function OpenSource() {
  return (
    <Band id="source" name="Open source">
      <div className="flex flex-col gap-6">
        {openSource.map((repo) => (
          <AnimateIn key={repo.id}>
            <article className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-elevated)] p-[clamp(22px,3.4vw,32px)]">
              <header className="mb-2.5 flex items-center gap-3">
                <h3 className="font-mono text-[19px] font-medium tracking-[-0.01em] text-text-primary">
                  {repo.name}
                </h3>
                <span className="rounded border border-[var(--color-border)] px-[7px] py-px font-mono text-[11px] text-text-muted">
                  {repo.licence}
                </span>
                <AskAIButton
                  variant="icon"
                  projectName={repo.name}
                  question={`Tell me about Raffy's ${repo.name} project`}
                  className="ml-auto"
                />
              </header>

              <p className="mb-[22px] max-w-[62ch] text-pretty text-[15px] leading-[1.65] text-text-secondary">
                {repo.pitch}
              </p>

              <CopyCommand lines={repo.install} />

              <dl className="mt-6">
                {repo.spec.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[124px_1fr] gap-4 border-t border-[var(--color-border-subtle)] py-[9px] max-[620px]:grid-cols-1 max-[620px]:gap-0.5"
                  >
                    <dt className="text-[13.5px] text-text-muted">{label}</dt>
                    <dd className="font-mono text-[12.5px] text-text-secondary">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href={repo.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block border-b border-[color-mix(in_srgb,var(--color-text-accent)_40%,transparent)] pb-px text-sm text-[var(--color-text-accent)] transition-colors hover:border-[var(--color-text-accent)]"
              >
                View on GitHub
              </a>
            </article>
          </AnimateIn>
        ))}
      </div>
    </Band>
  );
}
