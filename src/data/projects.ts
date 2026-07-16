export type ProjectCategory = "design" | "uiux" | "webdev" | "ai-automation";

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  design: "Design",
  uiux: "UI/UX",
  webdev: "Web Dev",
  "ai-automation": "AI Automation",
};

export interface Project {
  id: string; // slug → /projects/[id]
  name: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  cover: string;
  images?: string[];
  aspect?: "portrait" | "landscape" | "square";
  /** If true, card spans 2 columns in the homepage bento grid */
  featured?: boolean;
  role?: string;
  year?: string;
  client?: string;
  stack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  externalUrl?: string;
}

const P = "/assets/projects";

export const projects: Project[] = [
  {
    id: "oneclick",
    name: "OneClick",
    category: "webdev",
    tags: ["Next.js", "TypeScript", "n8n", "Webhooks"],
    description:
      "SaaS platform for automated social media posting — schedule, publish, and track across platforms from one dashboard.",
    cover: `${P}/one-click-app/thumb.png`,
    images: [
      `${P}/one-click-app/images.png`,
      `${P}/one-click-app/1.png`,
      `${P}/one-click-app/2.png`,
      `${P}/one-click-app/3.png`,
      `${P}/one-click-app/4.png`,
      `${P}/one-click-app/5.png`,
      `${P}/one-click-app/dash.png`,
    ],
    aspect: "landscape",
    featured: true,
    role: "Full-stack developer",
    stack: ["Next.js", "TypeScript", "n8n", "Webhooks"],
    githubUrl:
      "https://github.com/NullsCollection/oneclickpost-monorepo",
    liveUrl: "https://oneclickpost.xyz/",
  },
  {
    id: "n8n-automation",
    name: "n8n Automation Flows",
    category: "ai-automation",
    tags: ["n8n", "AI Automation", "Webhooks"],
    description:
      "Business process automation workflows with AI integrations, webhook pipelines, and third-party API connections.",
    cover: `${P}/n8n/n8n-01.png`,
    images: [
      `${P}/n8n/n8n-01.png`,
      `${P}/n8n/n8n-02.png`,
      `${P}/n8n/n8n-03.png`,
      `${P}/n8n/n8n-04.png`,
      `${P}/n8n/n8n-05.png`,
    ],
    aspect: "landscape",
    role: "Automation engineer",
    stack: ["n8n", "Webhooks", "REST APIs"],
  },
  {
    id: "grb",
    name: "GRB Enterprises Inc.",
    category: "webdev",
    tags: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
    description:
      "A comprehensive web application built with Laravel and Tailwind CSS, featuring a modern dashboard, user management, and streamlined business operations.",
    cover: `${P}/grb/grb-01.jpg`,
    images: [`${P}/grb/grb-01.jpg`],
    aspect: "landscape",
    role: "Frontend developer",
    stack: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
    liveUrl: "https://grb.com.ph/",
  },
  {
    id: "lotto",
    name: "Lotto Platform",
    category: "uiux",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "NextJS", "MUI", "UI Design"],
    description:
      "A modern lottery platform built with React and TypeScript, featuring a sleek UI, real-time updates, and a seamless user experience.",
    cover: `${P}/lotto/lotto-01.jpg`,
    images: [
      `${P}/lotto/dash-1.png`,
      `${P}/lotto/dash-2.png`,
      `${P}/lotto/dash-3.png`,
      `${P}/lotto/dash-4.png`,
      `${P}/lotto/lotto-2.png`,
    ],
    aspect: "portrait",
    featured: true,
    stack: ["React", "TypeScript"],
  },
  {
    id: "game-ui",
    name: "Game UI Design",
    category: "uiux",
    tags: ["Figma", "UI Design", "Game Design"],
    description:
      "UI/UX design for a live-streaming gaming application with a dark theme and dynamic visual elements.",
    cover: `${P}/GameUI/Artboard-1.png`,
    images: [
      `${P}/GameUI/Artboard-1.png`,
      `${P}/GameUI/Artboard%202.png`,
      `${P}/GameUI/Artboard%203.png`,
      `${P}/GameUI/Artboard%204.png`,
      `${P}/GameUI/Artboard%205.png`,
      `${P}/GameUI/Artboard%206.png`,
      `${P}/GameUI/6.jpg`,
    ],
    aspect: "portrait",
    role: "UI/UX designer",
    externalUrl:
      "https://www.behance.net/gallery/220534759/Mobile-App-for-Live-Streaming-StreamZ",
  },
  {
    id: "moscot",
    name: "Character Design — Monsters",
    category: "design",
    tags: ["Illustrator", "Character Design", "Digital Art"],
    description:
      "Complete character design package — original concepts, polished illustrations, custom color palettes, expressive poses, and ready-to-use assets.",
    cover: `${P}/Monster/Artboard-1.png`,
    images: [
      `${P}/Monster/Artboard-1.png`,
      `${P}/Monster/Artboard-2.png`,
      `${P}/Monster/Artboard%203.png`,
      `${P}/Monster/Artboard%204.png`,
      `${P}/Monster/Artboard%205.png`,
      `${P}/Monster/Artboard%206.png`,
      `${P}/Monster/Artboard%207.png`,
      `${P}/Monster/Artboard%208.jpg`,
    ],
    aspect: "square",
    role: "Illustrator",
    externalUrl:
      "https://www.behance.net/gallery/222146595/Character-Design-Monsters",
  },
  {
    id: "travel-portal",
    name: "Travel Portal",
    category: "uiux",
    tags: ["Web Design", "UI/UX", "Figma"],
    description:
      "A travel portal with a user-friendly interface, real-time flight and hotel search, and secure payment processing.",
    cover: `${P}/TravelPortal/Artboard-1.png`,
    images: [
      `${P}/TravelPortal/Artboard-1.png`,
      `${P}/TravelPortal/Artboard%202.png`,
      `${P}/TravelPortal/Home%20Pages.png`,
    ],
    aspect: "landscape",
    role: "UI/UX designer",
    externalUrl:
      "https://www.behance.net/gallery/224074537/Travel-Portal-Web-Design",
  },
  {
    id: "rrm",
    name: "RRM",
    category: "webdev",
    tags: ["Web App", "Frontend"],
    description: "Web application interface and dashboard build.",
    cover: `${P}/RRM/rrm-01.jpg`,
    images: [
      `${P}/RRM/rrm-01.jpg`,
      `${P}/RRM/RRM.jpg`,
      `${P}/RRM/rrm-details.png`,
    ],
    aspect: "landscape",
  },
  {
    id: "logo",
    name: "Logo Design",
    category: "design",
    tags: ["Branding", "Logo", "Illustrator"],
    description: "A collection of logo and brand mark explorations.",
    cover: `${P}/Logo/1.jpg`,
    images: [
      `${P}/Logo/1.jpg`,
      `${P}/Logo/2.jpg`,
      `${P}/Logo/3.jpg`,
      `${P}/Logo/4.jpg`,
      `${P}/Logo/5.png`,
    ],
    aspect: "square",
  },
  {
    id: "christmas",
    name: "Christmas Branding",
    category: "design",
    tags: ["Branding", "Illustration", "Social Media"],
    description: "Seasonal branding — concepts, mockups, and social assets.",
    cover: `${P}/Christmas/pfp.jpg`,
    images: [
      `${P}/Christmas/1.jpg`,
      `${P}/Christmas/3.jpg`,
      `${P}/Christmas/concept-1.jpg`,
      `${P}/Christmas/concept-2.jpg`,
      `${P}/Christmas/mockup-1.jpg`,
      `${P}/Christmas/mockup-2.jpg`,
      `${P}/Christmas/pfp.jpg`,
      `${P}/Christmas/UI-Christmas.jpg`,
    ],
    aspect: "portrait",
  },
  {
    id: "halloween",
    name: "Halloween Art",
    category: "design",
    tags: ["Illustration", "Digital Art"],
    description: "Halloween-themed illustration set.",
    cover: `${P}/Halloween/1.jpg`,
    images: [
      `${P}/Halloween/1.jpg`,
      `${P}/Halloween/2.jpg`,
      `${P}/Halloween/3.jpg`,
      `${P}/Halloween/4.jpg`,
      `${P}/Halloween/5.jpg`,
      `${P}/Halloween/6.jpg`,
      `${P}/Halloween/7.jpg`,
      `${P}/Halloween/H-1.jpg`,
    ],
    aspect: "portrait",
  },
  {
    id: "sonic",
    name: "Sonic",
    category: "design",
    tags: ["Fan Art", "Illustration", "Digital Art"],
    description: "Sonic-themed fan art illustration series.",
    cover: `${P}/Sonic/1.jpg`,
    images: [
      `${P}/Sonic/1.jpg`,
      `${P}/Sonic/3.jpg`,
      `${P}/Sonic/5.jpg`,
      `${P}/Sonic/7.jpg`,
    ],
    aspect: "portrait",
  },
];

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function allTags(): string[] {
  return Array.from(new Set(projects.flatMap((p) => p.tags))).sort();
}
