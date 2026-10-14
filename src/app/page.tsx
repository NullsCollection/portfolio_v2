import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { OpenSource } from "@/components/OpenSource";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Dot-grid canvas wraps all sections */}
      <main id="main" className="dot-grid">
        <Hero />

        <Projects />

        <OpenSource />

        <Experience />

        <About />

        <Contact />
      </main>

      {/* Footer — pb accounts for the fixed chat bar height */}
      {/* <footer className="border-t border-white/5 py-8 pb-28">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-2 px-6 sm:flex-row">
          <span className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Raffy Francisco
          </span>
          <span className="text-xs text-muted/50">
            Built with Next.js &amp; Claude AI
          </span>
        </div>
      </footer> */}

      {/* Floating elements — outside main for stacking context */}
      <ThemeToggle />
    </>
  );
}
