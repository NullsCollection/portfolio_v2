"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Work", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 border-b backdrop-blur-lg transition-colors duration-300',
        scrolled
          ? 'border-white/10 bg-[#202124]/90'
          : 'border-white/5 bg-[#202124]/75',
      ].join(' ')}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
        aria-label="Primary navigation"
      >
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-white transition-opacity hover:opacity-70"
        >
          NullzCollection
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-4 md:flex">
          <ul className="flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-white"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
          >
            Let&apos;s talk
          </a>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-white transition-colors hover:bg-white/5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/5 bg-[#202124] md:hidden">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={closeMobileMenu}
                    className="block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              onClick={closeMobileMenu}
              className="mt-4 block rounded-lg bg-secondary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
