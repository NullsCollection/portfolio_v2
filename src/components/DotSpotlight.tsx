"use client";

import { useEffect } from "react";

/**
 * Tracks the pointer and writes its position to CSS vars on :root.
 * The `.dot-grid::before` overlay (globals.css) uses these to reveal
 * brighter dots in a radius around the cursor.
 */
export function DotSpotlight() {
  useEffect(() => {
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      // ponytail: rAF-coalesced so we set the vars at most once per frame
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const s = document.documentElement.style;
        s.setProperty("--spotlight-x", `${e.clientX}px`);
        s.setProperty("--spotlight-y", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
