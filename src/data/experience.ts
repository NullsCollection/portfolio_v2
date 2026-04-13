export interface Experience {
  id: string;
  index: string;
  period: string;
  role: string;
  employmentType: string;
  company: string;
  companyUrl: string;
  description: string;
}

export const experiences: Experience[] = [
  {
    id: "kitcode",
    index: "01",
    period: "2025 — Present",
    role: "Web Designer / Developer",
    employmentType: "Freelance",
    company: "KitCode",
    companyUrl: "https://kitcodeinnovation.co.th/",
    description:
      "Building and designing web applications for clients — from landing pages to full-stack products, end to end.",
  },
  {
    id: "zeinous",
    index: "02",
    period: "2023 — 2025",
    role: "Graphic Designer",
    employmentType: "Full-time",
    company: "Zeinous",
    companyUrl: "https://zeinous.com/",
    description:
      "Led visual identity and marketing design across digital and print channels for a growing creative agency.",
  },
  {
    id: "bgk",
    index: "03",
    period: "2021 — 2023",
    role: "Graphic Designer",
    employmentType: "Full-time",
    company: "BGK Printing Services",
    companyUrl: "",
    description:
      "Produced print-ready artwork, brand collateral, and packaging for local and regional clients.",
  },
];
