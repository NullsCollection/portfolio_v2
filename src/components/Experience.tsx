import { experiences } from "@/data/experience";
import { AnimateIn } from "./AnimateIn";
import { AskAIButton } from "./AskAIButton";
import { Band } from "./Band";

/**
 * Numbered, because this is the one part of the page that genuinely is a
 * sequence. Row: number + period (mono) · role, company, one line · type +
 * Ask AI. The Ask AI icon shows on row hover with a mouse, and is always
 * visible on touch, where there's no hover to reveal it.
 */
export function Experience() {
  return (
    <Band id="experience" name="Experience">
      <AnimateIn>
        <ol role="list">
          {experiences.map((exp) => (
            <li
              key={exp.id}
              className="group grid grid-cols-[104px_1fr_auto] gap-x-[22px] gap-y-2 border-b border-[var(--color-border-subtle)] py-[19px] first:pt-0 max-[620px]:grid-cols-1 max-[620px]:gap-y-1.5"
            >
              <div className="flex flex-col gap-0.5 pt-[3px] font-mono text-xs text-text-muted max-[620px]:flex-row max-[620px]:gap-3">
                <span aria-hidden="true">{exp.index}</span>
                <span>{exp.period}</span>
              </div>

              <div className="min-w-0">
                <h3 className="mb-1 flex flex-wrap items-baseline gap-x-[9px] text-[15px] font-medium text-text-primary">
                  {exp.role}
                  {exp.companyUrl ? (
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13.5px] font-normal text-[var(--color-text-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                    >
                      {exp.company}
                      <span aria-hidden="true" className="ml-0.5 text-xs">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <span className="text-[13.5px] font-normal text-[var(--color-text-accent)]">
                      {exp.company}
                    </span>
                  )}
                </h3>
                <p className="max-w-[62ch] text-pretty text-[13.5px] leading-[1.6] text-text-secondary">
                  {exp.description}
                </p>
              </div>

              <div className="flex items-start gap-1.5 max-[620px]:items-center">
                <span className="whitespace-nowrap pt-[3px] text-[12.5px] text-text-muted max-[620px]:pt-0">
                  {exp.employmentType}
                </span>
                <AskAIButton
                  variant="icon"
                  projectName={exp.company}
                  question={`What did Raffy do at ${exp.company}?`}
                  className="-mt-[3px] max-[620px]:mt-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
                />
              </div>
            </li>
          ))}
        </ol>
      </AnimateIn>
    </Band>
  );
}
