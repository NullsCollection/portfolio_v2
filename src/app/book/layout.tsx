import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call — Raffy Francisco",
  description:
    "Schedule a free intro call with Raffy Francisco for web development, design, or AI automation work.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
