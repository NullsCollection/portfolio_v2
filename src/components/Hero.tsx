"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon, WhatsAppIcon } from "./icons/BrandIcons";
import Image from "next/image";

const SOCIAL_LINKS = [
  {
    href: "https://github.com/NullsCollection?tab=repositories",
    Icon: GitHubIcon,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/raffy-francisco-50607b325/",
    Icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "https://wa.me/639600723886",
    Icon: WhatsAppIcon,
    label: "WhatsApp",
  },
] as const;

const SPECIALTIES = [
  { label: "React" },
  { label: "TypeScript" },
  { label: "n8n Automation" },
  { label: "Figma" },
  { label: "Adobe Illustrator" },
] as const;

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: EASE },
  },
};

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-screen items-center"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left column */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-5"
          >
            {/* Availability badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)]/50 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-status-success)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-status-success)]" />
                </span>
                <span className="text-xs font-medium tracking-wide text-muted">
                  Available for Freelance &amp; Full-Time (Remote)
                </span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={fadeUp}
              className="text-5xl font-semibold leading-[1.04] tracking-tight text-[var(--color-text-primary)] md:text-7xl"
            >
              Raffy Francisco
            </motion.h1>

            {/* Role */}
            <motion.p
              variants={fadeUp}
              className="text-lg font-normal tracking-tight text-muted md:text-xl"
            >
              Web Developer | Graphic Designer | AI Automation
            </motion.p>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="max-w-[400px] text-sm leading-relaxed text-muted"
            >
              Helping businesses scale through clean design, smart development,
              and digital solutions.
            </motion.p>

            {/* Specialty tags */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {SPECIALTIES.map(({ label }) => (
                <span
                  key={label}
                  className="rounded-full border border-[var(--color-border)] bg-surface px-3 py-1 text-xs font-medium text-[var(--color-text-secondary)]"
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
              >
                View My Work
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="/assets/RESUME-Raffy-francisco.pdf"
                target="_blank"
                className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-surface px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] transition-colors hover:border-[var(--color-border-strong)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-strong)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)]"
              >
                Download CV
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-1 pt-1"
            >
              {SOCIAL_LINKS.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="rounded-lg p-2 text-muted transition-all hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-border-strong)]"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: EASE }}
            className="relative hidden lg:flex lg:justify-center"
          >
            {/* Photo frame */}
            <div className="group relative aspect-[4/4] w-96 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-surface transition-all duration-500 hover:border-secondary/40">
              <Image
                src="/assets/Profile.png"
                alt="Raffy Francisco"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                priority
              />
              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-base)]/20 via-transparent to-transparent" />
              {/* Corner accent */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/10 via-transparent to-tertiary/8" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-[var(--color-border)] p-1.5">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1 rounded-full bg-[var(--color-border)]"
          />
        </div>
      </motion.div>
    </section>
  );
}
