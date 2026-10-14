import Image from "next/image";
import { skillGroups } from "@/data/skills";
import { AnimateIn } from "./AnimateIn";
import { AskAIButton } from "./AskAIButton";
import { Band } from "./Band";

/**
 * Two paragraphs of prose, skills as three readable lines (not a wall of
 * chips), and the photo that used to sit in the hero.
 */
export function About() {
  return (
    <Band id="about" name="About">
      <AnimateIn>
        <div className="grid grid-cols-[1fr_232px] items-start gap-10 max-[860px]:grid-cols-1 max-[860px]:gap-7">
          <div className="min-w-0">
            <p className="mb-[17px] max-w-[60ch] text-pretty text-[15px] leading-[1.65] text-text-secondary">
              I&apos;m a Filipino developer and designer with five years
              shipping across agencies and freelance. I write React and Next.js
              frontends, Go APIs, and n8n pipelines to automate the rest.
            </p>
            <p className="mb-[17px] max-w-[60ch] text-pretty text-[15px] leading-[1.65] text-text-secondary">
              Design isn&apos;t a footnote — I spent four years in identity and
              print before moving into engineering, so I take things from an
              empty Figma file to a deployed app with no handoff in between.
            </p>

            <p className="border-t border-[var(--color-border-subtle)] pt-[7px] text-[13.5px] leading-[1.95] text-text-muted">
              {skillGroups.map(({ category, skills }) => (
                <span key={category} className="block">
                  {category} — {skills.join(", ")}.
                </span>
              ))}
            </p>

            <div className="mt-6">
              <AskAIButton
                variant="button"
                label="Ask AI about my background"
                question="What's Raffy's background, skills, and work experience?"
              />
            </div>
          </div>

          <figure className="relative aspect-square w-full overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-input)] max-[860px]:max-w-[200px]">
            <Image
              src="/assets/Profile.png"
              alt="Raffy Francisco"
              fill
              sizes="232px"
              className="object-cover"
            />
          </figure>
        </div>
      </AnimateIn>
    </Band>
  );
}
