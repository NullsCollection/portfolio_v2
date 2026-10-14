import type { Metadata } from "next";
import { DM_Mono, Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DotSpotlight } from "@/components/DotSpotlight";
import { ChatWidget } from "@/components/ChatWidget";
import "./globals.css";

// Two voices: Instrument Sans for anything a person wrote, DM Mono for
// anything a machine produced (dates, counts, stack lists, commands).
// Loaded as a variable font so in-between weights like 650 work.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Raffy Francisco - Web Developer & Graphic Designer | AI Powered",
  description:
    "Filipino Web Developer and Graphic Designer based remotely. Specializing in React, Next.js, TypeScript, and UI design. Available for freelance & full-time remote roles.",
  keywords: [
    "web developer",
    "graphic designer",
    "Automation",
    "n8n",
    "Go",
    "Next.js",
    "React",
    "TypeScript",
    "Figma",
    "freelance",
    "remote",
    "Philippines",
  ],
  authors: [
    { name: "Raffy Francisco", url: "https://www.nullscollection.tech" },
  ],
  creator: "Raffy Francisco",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nullscollection.tech",
    title: "Raffy Francisco — Web Developer & Graphic Designer",
    description:
      "Filipino Web Developer and Graphic Designer. Available for freelance & full-time remote.",
    siteName: "NullzCollection",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raffy Francisco — Web Developer & Graphic Designer",
    description:
      "Filipino Web Developer and Graphic Designer. Available for freelance & full-time remote.",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.nullscollection.tech"),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
      { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
    ],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Raffy Francisco",
  url: "https://www.nullscollection.tech",
  jobTitle: "Web Developer & Graphic Designer",
  knowsAbout: ["React", "Next.js", "TypeScript", "UI/UX Design", "n8n", "AI Automation"],
  nationality: "Filipino",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${dmMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        {/* First tab stop: jump past the nav. Every page's <main> has id="main". */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-md focus:border focus:border-[var(--color-border)] focus:bg-[var(--color-bg-elevated)] focus:px-3.5 focus:py-2 focus:text-sm focus:text-text-primary focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <DotSpotlight />
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
