import Link from "next/link";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./icons/BrandIcons";
import { AskAIButton } from "./AskAIButton";
import { Shipped } from "./Shipped";
import { heroSkills } from "@/data/skills";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/NullsCollection?tab=repositories",
    Icon: GitHubIcon,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/raffy-francisco-50607b325/",
    Icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "https://wa.me/639600723886",
    Icon: WhatsAppIcon,
    label: "WhatsApp",
  },
] as const;

const BUTTON =
  "inline-flex h-[38px] items-center rounded-lg border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]";

/**
 * Two columns: left says who he is (availability, name, one sentence, what
 * he does, where to go next); right shows proof (recently shipped). No chips,
 * no photo (it lives in About now), and nothing animates on load.
 */
export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="mx-auto grid max-w-[1080px] grid-cols-1 items-center gap-11 px-6 min-[960px]:grid-cols-[minmax(0,1fr)_380px] min-[960px]:gap-14 pb-[clamp(56px,9vw,104px)] pt-[calc(64px+clamp(56px,9vw,112px))] max-[620px]:px-4"
    >
      <div className="min-w-0">
        <p className="mb-[30px] inline-flex items-center gap-[9px] text-[13px] text-text-secondary">
          <span
            aria-hidden="true"
            className="size-[7px] shrink-0 rounded-full bg-[var(--color-status-success)]"
          />
          Available for freelance and full-time remote
        </p>

        {/* The one place the type gets loud. */}
        <h1 className="text-[clamp(2.9rem,7.2vw,5rem)] font-[650] leading-[0.94] tracking-[-0.038em] text-[var(--color-accent)]">
          Raffy&nbsp;Francisco
        </h1>

        <p className="mt-[22px] max-w-[34ch] text-pretty text-[clamp(1.0625rem,1.8vw,1.3125rem)] leading-[1.45] text-text-secondary">
          I help businesses scale through clean design and smart development
        </p>

        {/* Verb leads, tools support it — a client scanning for "Go" or
            "n8n" still finds it in one pass. */}
        <dl className="mt-[clamp(26px,3.4vw,34px)] grid max-w-[660px] grid-cols-3 gap-x-[30px] gap-y-5 border-t border-[var(--color-border-subtle)] pt-5 max-[620px]:grid-cols-1 max-[620px]:gap-y-3.5">
          {heroSkills.map(({ verb, tools }) => (
            <div
              key={verb}
              className="grid content-start gap-0.5 max-[620px]:grid-cols-[82px_1fr] max-[620px]:gap-x-3.5"
            >
              <dt className="text-[13.5px] font-medium text-text-primary">
                {verb}
              </dt>
              <dd className="text-pretty text-[13px] leading-normal text-text-muted">
                {tools}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-[clamp(34px,5vw,52px)] flex flex-wrap gap-2.5">
          <Link
            href="/projects"
            className={`${BUTTON} border-[var(--color-accent)] bg-[var(--color-accent)] text-white hover:border-[var(--color-accent-hover)] hover:bg-[var(--color-accent-hover)]`}
          >
            See the work
          </Link>
          <a
            href="/assets/RESUME-Raffy-francisco.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={`${BUTTON} border-[var(--color-border)] text-text-secondary hover:border-[var(--color-border-strong)] hover:text-text-primary`}
          >
            Résumé
          </a>
          <AskAIButton
            variant="button"
            label="Ask AI about Me"
            question="Who is Raffy Francisco and what does he do?"
            className="h-[38px] border-transparent! bg-transparent! py-0! text-text-secondary! hover:border-[var(--color-border)]! hover:text-text-primary!"
          />
        </div>

        <div className="mt-5 flex items-center gap-1">
          {SOCIAL_LINKS.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="rounded-lg p-2 text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-strong)]"
            >
              <Icon className="h-[18px] w-[18px]" />
            </a>
          ))}
        </div>
      </div>

      {/* Right column: proof. Stacks under the CTAs below 960px. */}
      <aside className="min-w-0 max-[959px]:max-w-[520px]">
        <Shipped />
      </aside>
    </section>
  );
}
