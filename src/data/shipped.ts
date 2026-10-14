/**
 * "Recently shipped" — dated proof in the hero, newest first. Replaces the
 * GitHub contribution graph, which couldn't see private client work or
 * design work.
 *
 * TODO: every `date` is a placeholder until the real ship months are in.
 */
export interface ShippedItem {
  /** Year and month, "YYYY-MM". */
  date: string;
  name: string;
  blurb: string;
  /** A page (`/projects/...`) or an in-page anchor (`#source`). Omit when
   *  there's nowhere to go yet — the row renders without a link. */
  href?: string;
  /** Only the lead (first) item shows its image. */
  image?: { src: string; alt: string };
}

export const shipped: ShippedItem[] = [
  {
    date: "2026-10",
    name: "Lottery Back Office",
    blurb: "UI/UX overhaul and front end, 69 screens",
    // Case study page lands with the project entry (plan Phase 7).
    image: {
      src: "/assets/projects/lottery-backoffice/cover.png",
      alt: "Lottery back office dashboard on desktop and phone",
    },
  },
  {
    date: "2026-09",
    name: "OneClick",
    blurb: "Live SaaS, posts to four platforms",
    href: "/projects/oneclick",
  },
  {
    date: "2026-08",
    name: "memdb",
    blurb: "Open-source memory for coding agents",
    // Points at the Open source section once it exists (plan Phase 6).
    href: "https://github.com/NullsCollection/agent--recall-memory",
  },
  {
    date: "2025-11",
    name: "GRB Enterprises",
    blurb: "Dashboard and public site",
    href: "/projects/grb",
  },
];
