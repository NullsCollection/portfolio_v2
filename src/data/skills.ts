export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Design",
    skills: [
      "Figma",
      "Adobe Illustrator",
      "Photoshop",
      "Typography",
      "Brand Identity",
    ],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    category: "Tools",
    skills: ["Git", "Railway", "Vercel", "Slack", "Bitbucket", "Trello", "n8n"],
  },
];

/**
 * Hero skills trio — what he does (verb) and what he does it with (tools).
 * Separate from `skillGroups` because the hero groups by verb, not by tool
 * category: "Automate" has no equivalent in the About groups.
 */
export interface HeroSkill {
  verb: string;
  tools: string;
}

export const heroSkills: HeroSkill[] = [
  { verb: "Build", tools: "React, Next.js, TypeScript, Go" },
  { verb: "Design", tools: "Figma, Illustrator, minimalist UI" },
  { verb: "Automate", tools: "n8n, AI agents, voice AI" },
];

export const specializations = [
  { label: "Web Development" },
  { label: "UI Design" },
  { label: "AI Automation" },
  { label: "Brand Design" },
] as const;
