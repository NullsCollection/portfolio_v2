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
  /** Internal / NDA work: the case study says "Private · internal tool"
   *  instead of showing links. */
  private?: boolean;
  /** Full stack as [area, what it uses] rows. When present it replaces the
   *  one-line `stack` on the case study page. */
  stackTable?: [area: string, uses: string][];
  /** Case-study story. Each part renders only when present. */
  story?: {
    problem?: string;
    built?: string;
    result?: string;
  };
}

const P = "/assets/projects";

export const projects: Project[] = [
  {
    id: "lottery-backoffice",
    name: "Lottery Back Office",
    category: "uiux",
    tags: ["UI/UX", "Design System", "Next.js", "MUI", "React Query"],
    description:
      "UI/UX overhaul and front-end build of the admin dashboard behind a lottery platform — 69 screens, two brands, light and dark.",
    cover: `${P}/lottery-backoffice/cover.png`,
    images: [
      `${P}/lottery-backoffice/cover.png`,
      `${P}/lottery-backoffice/themes.webp`,
      `${P}/lottery-backoffice/tickets.webp`,
      `${P}/lottery-backoffice/key-screens.webp`,
      `${P}/lottery-backoffice/dashboard-blue-dark.webp`,
      `${P}/lottery-backoffice/mobile.webp`,
    ],
    aspect: "landscape",
    featured: true,
    role: "UI/UX redesign + front-end",
    // Client brand stays off (neutral "B · Back office" mark in every image).
    client: "Thailand-based lottery platform (at work)",
    private: true,
    stack: ["Next.js", "MUI v5", "React Query", "Redux Toolkit", "i18next", "CASL"],
    stackTable: [
      ["Routing", "Next.js Pages Router"],
      ["UI", "MUI v5 + Emotion, MUI X DataGrid + DataGrid Pro for big tables"],
      ["Server data", "React Query v3 + Axios"],
      ["App state", "Redux Toolkit"],
      ["Forms", "React Hook Form + Yup"],
      ["Translations", "i18next (Thai by default, plus English)"],
      ["Permissions", "CASL"],
      ["Charts", "Recharts and ApexCharts"],
      ["Small stuff", "react-hot-toast, react-datepicker, Iconify icons"],
      ["Tooling", "Jest, ESLint 9, Prettier"],
      ["Deploy", "Docker + Bitbucket Pipelines"],
    ],
    story: {
      problem:
        "The app worked, but every screen had grown its own way of doing things: coloured borders on every card, filters hidden behind a builder, errors hidden on wizard steps.",
      built:
        "I redesigned all 69 screens as one calm system — 13 neutrals, one brand accent, no shadows — then built the front end on MUI. One codebase serves two brands, each in light and dark, in Thai and English.",
      result:
        "Shipped as the internal back office for the operator's team. It's a private tool, so there's no public link.",
    },
  },
  {
    id: "oneclick",
    name: "OneClick",
    category: "webdev",
    tags: ["Next.js", "Go", "PostgreSQL", "Tailwind CSS"],
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
    stack: ["Next.js 16", "Go", "PostgreSQL", "Tailwind v4"],
    stackTable: [
      ["Marketing site", "Next.js 16 (App Router), React 19, TypeScript, Tailwind v4. Hand-built UI, no component library"],
      ["Marketing extras", "Motion, Cal.com embed, Sentry, lucide icons"],
      ["Admin dashboard", "Next.js 16, React 19, Tailwind v4, shadcn (base-nova preset, on Base UI)"],
      ["Admin extras", "TanStack Query, dnd-kit, PapaParse for CSV import, Sonner, next-themes"],
      ["API", "Go + Gin, plain database/sql, PostgreSQL"],
      ["Auth & email", "JWT in httpOnly cookies, Google OAuth, Resend"],
      ["Hosting", "Vercel (marketing + admin), Railway (API + Postgres), Namecheap DNS"],
    ],
    githubUrl:
      "https://github.com/NullsCollection/oneclickpost-monorepo",
    // .xyz redirects here; link the real domain.
    liveUrl: "https://www.oneclickpost.co/",
    story: {
      problem:
        "Posting the same update to Facebook, Instagram, LinkedIn and X means four logins, four editors, and four chances to get it wrong.",
      built:
        "One dashboard that writes once and publishes everywhere. Two Next.js apps — a hand-built marketing site and a shadcn admin — sit on a Go API with Postgres, JWT sessions and Google sign-in.",
      result:
        "Live and taking real users at oneclickpost.co. I designed it, built it, and run it — hosting bill included.",
    },
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
