"use client";

import { useState, useTransition } from "react";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { AnimateIn } from "./AnimateIn";
import { Band } from "./Band";
import { submitContact } from "@/app/actions/contact";

const CONTACT_LINKS = [
  {
    href: "mailto:raffy7792@gmail.com",
    label: "Email",
    display: "raffy7792@gmail.com",
  },
  {
    href: "https://wa.me/639600723886",
    label: "WhatsApp",
    display: "+63 960 072 3886",
  },
  {
    href: "https://www.linkedin.com/in/raffy-francisco-50607b325/",
    label: "LinkedIn",
    display: "raffy-francisco",
  },
  {
    href: "https://github.com/NullsCollection?tab=repositories",
    label: "GitHub",
    display: "NullsCollection",
  },
] as const;

type FormStatus = "idle" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-input)] px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-subtle)]";

const labelClass = "mb-1.5 block text-[13px] text-text-muted";

/**
 * One-line lede, the form (behaviour unchanged), and direct lines as a
 * hairline list. Bottom padding keeps the chat dock off the last row.
 */
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");

    startTransition(async () => {
      const result = await submitContact({ name, email, message });
      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus("error");
        setErrorMessage(
          result.error ?? "Something went wrong. Please try again.",
        );
      }
    });
  };

  return (
    <Band id="contact" name="Contact" className="pb-28">
      <AnimateIn>
        <p className="mb-[26px] max-w-[44ch] text-pretty text-[clamp(1.0625rem,1.7vw,1.25rem)] leading-normal text-text-primary">
          Tell me what you&apos;re building and when you need it. I answer
          within a day.
        </p>

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] items-start gap-12 max-[860px]:grid-cols-1 max-[860px]:gap-10">
          {status === "success" ? (
            <div
              role="status"
              className="flex flex-col items-start gap-3 rounded-[10px] border border-[var(--color-border)] bg-[var(--color-status-success-bg)] p-6"
            >
              <CheckCircle
                className="h-6 w-6 text-[var(--color-status-success)]"
                aria-hidden="true"
              />
              <div>
                <p className="font-medium text-text-primary">Message sent.</p>
                <p className="mt-1 text-sm text-text-secondary">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="cursor-pointer text-sm text-text-muted underline-offset-2 transition-colors hover:text-text-primary hover:underline"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              <div className="grid grid-cols-2 gap-4 max-[620px]:grid-cols-1">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What are you working on, and when do you need it?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-status-error-bg)] p-3 text-sm text-[var(--color-status-error)]"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {errorMessage}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex h-[38px] cursor-pointer items-center gap-2 rounded-lg bg-[var(--color-accent)] px-4 text-sm font-medium text-white transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-base)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isPending ? "Sending…" : "Send message"}
                  {!isPending && (
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </form>
          )}

          <div>
            <ul
              role="list"
              className="border-t border-[var(--color-border-subtle)]"
            >
              {CONTACT_LINKS.map(({ href, label, display }) => (
                <li
                  key={label}
                  className="border-b border-[var(--color-border-subtle)]"
                >
                  <a
                    href={href}
                    target={href.startsWith("mailto") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="grid grid-cols-[88px_1fr] items-baseline gap-3 py-3 text-[14.5px] text-text-secondary hover:text-text-primary motion-safe:transition-[padding,color] motion-safe:duration-200 motion-safe:hover:pl-[9px]"
                  >
                    <span className="text-text-primary">{label}</span>
                    <span className="truncate">{display}</span>
                  </a>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={() =>
                window.dispatchEvent(new CustomEvent("open-chat-widget"))
              }
              className="group mt-5 inline-flex cursor-pointer items-center gap-2 text-sm text-text-muted transition-colors hover:text-text-primary"
            >
              Quick question? Ask my AI assistant
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </AnimateIn>
    </Band>
  );
}
