export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  image?: string;
  /** If true, card spans 2 columns in the bento grid */
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: "oneclick",
    name: "OneClick",
    description:
      "SaaS platform for automated social media posting — schedule, publish, and track across platforms from one dashboard.",
    tags: ["Next.js", "TypeScript", "n8n", "Webhooks"],
    image: "/assets/projects/one-click-app/image.png",
    featured: true,
    githubUrl:
      "https://github.com/NullsCollection/social-media-post-custom-forms",
    liveUrl: "https://oneclickpost.xyz/",
  },
  {
    id: "n8n-automation",
    name: "n8n Automation Flows",
    description:
      "Business process automation workflows with AI integrations, webhook pipelines, and third-party API connections.",
    tags: ["n8n", "AI Automation", "Webhooks"],
    image: "/assets/projects/n8n/n8n-01.png",
    featured: false,
  },
  {
    id: "grb",
    name: "GRB Enterprises Inc.",
    description:
      "A comprehensive web application built with Laravel and Tailwind CSS for GRB Enterprises Inc., featuring a modern dashboard, user management, and streamlined business operations.",
    tags: ["Laravel", "Tailwind CSS", "PHP", "MySQL", "Frontend"],
    image: "/assets/projects/grb/grb-01.jpg",
    featured: false,
    liveUrl: "https://grb.com.ph/",
  },
  {
    id: "lotto",
    name: "Lotto Platform",
    description:
      "A modern lottery platform built with React and TypeScript, featuring a sleek UI, real-time updates, and seamless user experience for lottery enthusiasts",
    tags: ["React", "TypeScript", "UI Design", "Frontend"],
    image: "/assets/projects/lotto/lotto-01.jpg",
    featured: true,
  },
  {
    id: "game-ui",
    name: "Game UI Design",
    description:
      "UI/UX design for a gaming application with dark theme and dynamic visual elements.",
    tags: ["Figma", "UI Design", "Game Design"],
    image: "/assets/projects/GameUI/Artboard-1.png",
    featured: false,
    liveUrl:
      "https://www.behance.net/gallery/220534759/Mobile-App-for-Live-Streaming-StreamZ",
  },
  {
    id: "moscot",
    name: "Character Design | Moscot Design",
    description:
      "Complete character design package including original character concepts, polished illustrations, custom color palettes, expressive poses, and ready-to-use assets.",
    tags: ["Illustrator", "Character Design", "Digital Art"],
    image: "/assets/projects/Monster/Artboard-2",
    featured: false,
    liveUrl:
      "https://www.behance.net/gallery/222146595/Character-Design-Monsters",
  },
  {
    id: "travel-portal",
    name: "Travel Portal",
    description:
      "A travel portal website with a user-friendly interface, real-time flight and hotel search, and secure payment processing.",
    tags: ["Web Design", "UI/UX", "Figma"],
    image: "/assets/projects/TravelPortal/Artboard-1.png",
    featured: false,
    liveUrl:
      "https://www.behance.net/gallery/224074537/Travel-Portal-Web-Design",
  },
];
