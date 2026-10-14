"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { ArrowUp, ChevronDown, RotateCcw } from "lucide-react";

import { ChatMessageText } from "./ChatMessageText";

/** Thrown when /api/chat responds with a non-2xx and a visitor-facing message. */
class ApiError extends Error {}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const uid = () => crypto.randomUUID();

/** Shown above the bar until the first message, so a visitor never has to
 *  guess what this thing knows. Label → the question actually sent. */
const SUGGESTIONS = [
  ["Is he available?", "Is Raffy available for hire?"],
  ["What are his rates?", "What does Raffy charge?"],
  ["Automation work", "Tell me about his automation work"],
  ["Tech stack", "What is his tech stack?"],
] as const;

const ICON_BTN =
  "grid size-[26px] cursor-pointer place-items-center rounded-md text-text-muted transition-colors hover:bg-[var(--color-bg-input)] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]";

export function ChatWidget() {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea up to ~4 lines, then scroll
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 104)}px`;
  }, []);

  // External trigger (Contact section CTA)
  useEffect(() => {
    const handler = () => {
      setShowMessages(true);
      setTimeout(() => textareaRef.current?.focus(), 60);
    };
    window.addEventListener("open-chat-widget", handler);
    return () => window.removeEventListener("open-chat-widget", handler);
  }, []);

  // Auto-open panel on first message
  useEffect(() => {
    if (messages.length > 0) setShowMessages(true);
  }, [messages.length]);

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Esc collapses the transcript without wiping it
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowMessages(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const sendText = useCallback(
    async (text: string) => {
      if (!text || isLoading) return;

      // Capture snapshot synchronously before any state updates to avoid stale closure
      const snapshot = messages;
      const userMsg: Message = { id: uid(), role: "user", content: text };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);

      try {
        const history = [...snapshot, userMsg].map(({ role, content }) => ({
          role,
          content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
        });

        if (!res.ok) {
          const data = (await res.json().catch(() => ({}))) as { error?: string };
          throw new ApiError(data.error ?? "Request failed");
        }

        const data = (await res.json()) as { reply: string };
        setMessages((prev) => [
          ...prev,
          { id: uid(), role: "assistant", content: data.reply },
        ]);
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            // Server-side messages are already written for visitors; show them
            // as-is. The generic line is for network failures only.
            content:
              err instanceof ApiError
                ? err.message
                : "I couldn't process that at the moment. I'm sorry. Please reach out directly at raffy7792@gmail.com.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    void sendText(text);
  }, [input, sendText]);

  // "Ask AI about this" buttons on project cards dispatch this event
  useEffect(() => {
    const handler = (e: Event) => {
      const question = (e as CustomEvent<{ question?: string }>).detail
        ?.question;
      if (!question) return;
      setShowMessages(true);
      void sendText(question);
    };
    window.addEventListener("ask-ai", handler);
    return () => window.removeEventListener("ask-ai", handler);
  }, [sendText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  const reset = () => {
    setMessages([]);
    setShowMessages(false);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const hasConversation = messages.length > 0;
  const logOpen = showMessages && hasConversation;

  // Widget is global (root layout) — keep it off the Cal.com booking page
  if (pathname === "/book") return null;

  return (
    <div
      aria-label="AI chat assistant"
      className="fixed bottom-4 left-1/2 z-50 w-[min(560px,calc(100vw-32px))] -translate-x-1/2 max-[620px]:bottom-2.5"
    >
      {/* Suggested questions — only until the first message */}
      {!hasConversation && (
        <div className="mb-2 flex flex-wrap gap-1.5 pl-0.5">
          {SUGGESTIONS.map(([label, question], i) => (
            <button
              key={label}
              type="button"
              onClick={() => void sendText(question)}
              className={`cursor-pointer rounded-full border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-elevated)_86%,transparent)] px-3 py-[5px] text-[12.5px] text-text-secondary backdrop-blur-md transition-colors hover:border-[var(--color-border-strong)] hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${i >= 2 ? "max-[620px]:hidden" : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* One surface: header, transcript and composer split by hairlines */}
      <div className="overflow-hidden rounded-[14px] border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-bg-elevated)_92%,transparent)] shadow-[0_14px_44px_rgba(0,0,0,0.26)] backdrop-blur-[18px]">
        {hasConversation && (
          <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] py-[7px] pl-3.5 pr-2.5">
            <span className="inline-flex items-center gap-[7px] text-[12.5px] text-text-secondary">
              <i
                aria-hidden="true"
                className="size-1.5 rounded-full bg-[var(--color-status-success)]"
              />
              Raffy&apos;s AI
              {!logOpen && (
                <span className="font-mono text-[11px] text-text-muted">
                  · {messages.length} message{messages.length !== 1 ? "s" : ""}
                </span>
              )}
            </span>
            <span className="inline-flex gap-0.5">
              <button
                type="button"
                onClick={reset}
                aria-label="Start over"
                title="Start over"
                className={ICON_BTN}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setShowMessages((open) => !open)}
                aria-label={logOpen ? "Collapse chat" : "Expand chat"}
                aria-expanded={logOpen}
                className={ICON_BTN}
              >
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${logOpen ? "" : "rotate-180"}`}
                  aria-hidden="true"
                />
              </button>
            </span>
          </div>
        )}

        {/* Transcript. Always mounted and collapsed with a CSS grid-rows
            transition, so closing can never get stuck mid-animation. */}
        <div
          aria-hidden={!logOpen}
          inert={!logOpen}
          className={`grid motion-safe:transition-[grid-template-rows] motion-safe:duration-200 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] ${logOpen ? "grid-rows-[1fr] border-b border-[var(--color-border-subtle)]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div
              role="log"
              aria-live="polite"
              className="chat-scroll flex max-h-[min(46vh,340px)] flex-col gap-2.5 overflow-y-auto p-3.5 max-[620px]:max-h-[42vh]"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={[
                    "max-w-[84%] text-pretty rounded-xl px-3 py-[9px] text-[13.5px] leading-[1.55]",
                    msg.role === "user"
                      ? "self-end rounded-br-[5px] bg-[var(--color-accent)] text-white"
                      : "self-start rounded-bl-[5px] bg-[var(--color-bg-input)] text-text-primary",
                  ].join(" ")}
                >
                  {msg.role === "assistant" ? (
                    <ChatMessageText text={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              ))}

              {isLoading && (
                <div
                  role="status"
                  aria-label="Raffy's AI is typing"
                  className="flex items-center gap-1 self-start rounded-xl rounded-bl-[5px] bg-[var(--color-bg-input)] p-[13px]"
                >
                  {[0, 160, 320].map((delay) => (
                    <i
                      key={delay}
                      aria-hidden="true"
                      style={{ animationDelay: `${delay}ms` }}
                      className="animate-blip size-[5px] rounded-full bg-text-muted"
                    />
                  ))}
                </div>
              )}

              <div ref={bottomRef} aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Composer — one row: the input grows, send sits inline */}
        <div className="flex items-end gap-2 py-2 pl-3.5 pr-2">
          <label htmlFor="chat-input" className="sr-only">
            Ask something about Raffy
          </label>
          <textarea
            id="chat-input"
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              autoResize();
            }}
            onKeyDown={handleKeyDown}
            // A collapsed transcript reopens when you start typing again.
            onFocus={() => hasConversation && setShowMessages(true)}
            placeholder="Ask something about Raffy"
            disabled={isLoading}
            className="chat-scroll max-h-[104px] flex-1 resize-none overflow-y-auto bg-transparent py-[7px] text-sm leading-normal text-text-primary placeholder:text-text-muted focus:outline-none disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => void sendMessage()}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
            className="grid size-8 shrink-0 cursor-pointer place-items-center rounded-lg bg-[var(--color-accent)] text-white transition-[background-color,opacity] hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-elevated)] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowUp className="h-[15px] w-[15px]" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
