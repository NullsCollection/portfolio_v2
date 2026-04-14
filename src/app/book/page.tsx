"use client";

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { ArrowLeft, Clock, Video, Globe } from "lucide-react";
import Link from "next/link";

const CAL_LINK = process.env.NEXT_PUBLIC_CAL_LINK ?? "";

export default function BookPage() {
  useEffect(() => {
    if (!CAL_LINK) return;
    (async () => {
      const cal = await getCalApi({ namespace: "book-call" });
      cal("ui", {
        theme: "dark",
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  return (
    <div className="dot-grid min-h-screen bg-[#202124]">
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-15">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        {/* Page header */}
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-widest text-secondary">
            Let&apos;s connect
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
            Book a call
          </h1>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
            Free 30-min intro call. Ask about my work, discuss a project, or
            just say hi.
          </p>
        </div>

        {/* Meta row */}
        <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted">
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-secondary" />
            30 minutes
          </span>
          <span className="flex items-center gap-2">
            <Video className="h-4 w-4 text-secondary" />
            Google Meet / Zoom
          </span>
          <span className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-secondary" />
            Remote — any timezone
          </span>
        </div>

        <div className="my-8 h-px bg-white/5" />

        {/* Cal.com embed */}
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#303134]">
          {CAL_LINK ? (
            <Cal
              namespace="book-call"
              calLink={CAL_LINK}
              style={{ width: "100%", height: "100%", minHeight: "600px" }}
              config={{ layout: "month_view", theme: "dark" }}
            />
          ) : (
            <div className="flex min-h-[200px] items-center justify-center text-sm text-muted">
              Set{" "}
              <code className="mx-1 rounded bg-white/5 px-1.5 py-0.5 font-mono text-xs text-tertiary">
                NEXT_PUBLIC_CAL_LINK
              </code>{" "}
              to enable booking.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
