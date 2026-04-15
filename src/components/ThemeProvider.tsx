"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"   // sets data-theme="light" | "dark" on <html>
      defaultTheme="system"    // reads prefers-color-scheme on first visit
      enableSystem             // auto-detects OS preference
      disableTransitionOnChange // prevents FOUC on initial theme resolution;
                                // CSS transitions in globals.css handle manual toggle
    >
      {children}
    </NextThemesProvider>
  );
}
