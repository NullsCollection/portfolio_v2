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

export const specializations = [
  { label: "Web Development" },
  { label: "UI Design" },
  { label: "AI Automation" },
  { label: "Brand Design" },
] as const;
