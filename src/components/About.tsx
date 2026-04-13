import { Code2, Palette, Bot, Layers } from "lucide-react";
import { skillGroups } from "@/data/skills";
import { AnimateIn } from "./AnimateIn";

const SPECIALIZATIONS = [
  { icon: Code2, label: "Web Development" },
  { icon: Palette, label: "UI Design" },
  { icon: Bot, label: "AI Automation" },
  { icon: Layers, label: "Brand Design" },
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24">
      <div className="mx-auto max-w-4xl px-6">
        <AnimateIn>
          <div className="mb-16">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-tertiary">
              Background
            </p>
            <h2
              id="about-heading"
              className="text-3xl font-semibold tracking-tight text-white"
            >
              About
            </h2>
          </div>
        </AnimateIn>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Bio column */}
          <AnimateIn>
            <div className="flex flex-col gap-5">
              <p className="text-base leading-relaxed text-muted">
                I'm a Filipino web developer and automation engineer with five
                years of experience shipping products across agencies and
                freelance. I build fast web apps and automate the workflows
                behind them — React frontends, Next.js APIs, and n8n pipelines
                wired to AI.{" "}
                <span className="text-white">
                  {" "}
                  If a process can be automated, I'll automate it.
                </span>
              </p>
              <p className="text-base leading-relaxed text-muted">
                Currently open to freelance projects and full-time remote roles.
              </p>

              {/* Specialization pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {SPECIALIZATIONS.map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-surface px-3 py-1.5 text-sm text-white/65"
                  >
                    <Icon
                      className="h-3.5 w-3.5 text-secondary"
                      aria-hidden="true"
                    />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

          {/* Skills column */}
          <AnimateIn delay={0.12}>
            <div className="flex flex-col gap-7">
              {skillGroups.map(({ category, skills }) => (
                <div key={category}>
                  <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted">
                    {category}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-surface px-2.5 py-1 text-xs text-muted"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
