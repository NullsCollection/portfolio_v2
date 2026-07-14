import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = "https://www.nullscollection.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/projects`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/book`, changeFrequency: "yearly", priority: 0.5 },
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.id}`,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
