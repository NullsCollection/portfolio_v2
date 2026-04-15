import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { ChatWidget } from "@/components/ChatWidget";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <>
      <Nav />

      {/* Dot-grid canvas wraps all sections */}
      <main className="dot-grid">
        <Hero />

        {/* Thin separator */}
        <div aria-hidden="true" className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-[var(--color-border-subtle)]" />
        </div>

        <Experience />

        <div aria-hidden="true" className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-[var(--color-border-subtle)]" />
        </div>

        <Projects />

        <div aria-hidden="true" className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-[var(--color-border-subtle)]" />
        </div>

        <About />

        <div aria-hidden="true" className="mx-auto max-w-4xl px-6">
          <div className="h-px bg-[var(--color-border-subtle)]" />
        </div>

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
      <ChatWidget />
      <ThemeToggle />
    </>
  );
}
