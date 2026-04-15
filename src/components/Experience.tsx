import { experiences } from "@/data/experience";
import { AnimateIn } from "./AnimateIn";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-24"
    >
      <div className="mx-auto max-w-4xl px-6">
        <AnimateIn>
          <div className="mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-text-accent">
              Work History
            </p>
            <h2
              id="experience-heading"
              className="text-3xl font-semibold tracking-tight text-text-primary"
            >
              Experience
            </h2>
          </div>
        </AnimateIn>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <AnimateIn key={exp.id} delay={i * 0.08}>
              <div className="group border-t border-[var(--color-border-subtle)] py-8 last:border-b last:border-[var(--color-border-subtle)]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-8">
                  {/* Index number */}
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted sm:w-6 sm:pt-px">
                    {exp.index}
                  </span>

                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="text-sm text-muted">{exp.period}</span>
                      <span className="text-muted/40">/</span>
                      <span className="text-sm font-medium text-text-primary">
                        {exp.role}
                      </span>
                      <span className="text-muted/40">/</span>
                      <a
                        href={exp.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-0.5 text-sm text-secondary transition-colors hover:text-text-accent/80"
                      >
                        {exp.company}
                        <span aria-hidden="true" className="text-xs">
                          ↗
                        </span>
                      </a>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">
                      {exp.description}
                    </p>
                  </div>

                  {/* Employment type badge */}
                  <span className="shrink-0 self-start rounded-full border border-[var(--color-border)] bg-surface px-2.5 py-1 text-xs text-muted">
                    {exp.employmentType}
                  </span>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
