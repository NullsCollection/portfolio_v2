"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

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
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-lg transition-colors duration-300",
        scrolled
          ? "border-[var(--color-navbar-border)] bg-[var(--color-navbar-bg)]/90"
          : "border-[var(--color-border-subtle)] bg-[var(--color-navbar-bg)]/75",
      ].join(" ")}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
        aria-label="Primary navigation"
      >
        <a
          href="#"
          className="text-sm font-semibold tracking-tight text-muted transition-opacity hover:opacity-70"
        >
          NullzCollection
        </a>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-1" role="list">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted transition-colors hover:text-[var(--color-text-primary)]"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <Link
            href="/book"
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Book a call
          </Link>
        </div>

        {/* Mobile burger button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-md p-2 text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-bg-surface)] md:hidden"
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
        <div className="border-t border-[var(--color-border-subtle)] bg-[var(--color-navbar-bg)] md:hidden">
          <div className="mx-auto max-w-4xl px-6 py-4">
            <ul className="flex flex-col gap-1" role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={closeMobileMenu}
                    className="block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-[var(--color-bg-surface)] hover:text-[var(--color-text-primary)]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href="/book"
              onClick={closeMobileMenu}
              className="mt-4 block w-full rounded-lg bg-secondary px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              Book a call
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
