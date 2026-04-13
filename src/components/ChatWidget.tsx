"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, ChevronDown, RotateCcw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const uid = () => crypto.randomUUID();

export function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea up to 6 lines
  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 144)}px`;
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

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    // Capture snapshot synchronously before any state updates to avoid stale closure
    const snapshot = messages;
    const userMsg: Message = { id: uid(), role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
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
        const data = (await res.json()) as { error?: string };
        throw new Error(data.error ?? "Request failed");
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
          content:
            err instanceof Error && err.message.includes("Too many")
              ? "You've hit the rate limit. Try again in an hour!"
              : "I couldn't process that. Reach out directly at raffy7792@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, messages]);

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

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none"
      aria-label="AI chat assistant"
    >
      {/* ── Messages panel ── */}
      <AnimatePresence>
        {showMessages && hasConversation && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 32, stiffness: 420 }}
            className="pointer-events-auto mx-auto max-w-2xl px-4 mb-1"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#202124]/96 shadow-2xl backdrop-blur-xl">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </span>
                  <span className="text-xs font-medium text-white/50">
                    Raffy&apos;s AI
                  </span>
                </div>
                <button
                  onClick={() => setShowMessages(false)}
                  aria-label="Collapse chat"
                  className="rounded-md p-1 text-white/30 transition-colors hover:text-white/70"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="chat-scroll flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={[
                      "max-w-[82%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "ml-auto bg-secondary text-white"
                        : "mr-auto bg-surface text-white/80",
                    ].join(" ")}
                  >
                    {msg.content}
                  </div>
                ))}

                {isLoading && (
                  <div className="mr-auto flex items-center gap-2 rounded-xl bg-surface px-3.5 py-2.5 text-sm text-muted">
                    <Loader2
                      className="h-3.5 w-3.5 animate-spin"
                      aria-hidden="true"
                    />
                    Thinking…
                  </div>
                )}

                <div ref={bottomRef} aria-hidden="true" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Persistent input bar ── */}
      <div className="pointer-events-auto">
        <div className="mx-auto max-w-2xl px-4 py-3">
          {/* Collapsed indicator */}
          <AnimatePresence>
            {hasConversation && !showMessages && (
              <motion.button
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onClick={() => setShowMessages(true)}
                className="mb-2 flex w-full items-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/60"
              >
                <ChevronDown
                  className="h-3 w-3 rotate-180"
                  aria-hidden="true"
                />
                {messages.length} message{messages.length !== 1 ? "s" : ""} —
                tap to expand
              </motion.button>
            )}
          </AnimatePresence>

          {/* Input card */}
          <div className="rounded-2xl border border-white/10 bg-[#2a2b2e] transition-colors duration-150 focus-within:border-white/20">
            <textarea
              ref={textareaRef}
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                autoResize();
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about Raffy"
              disabled={isLoading}
              aria-label="Chat message input"
              className="w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-sm text-white placeholder:text-white/25 focus:outline-none disabled:opacity-50"
            />

            {/* Action row */}
            <div className="flex items-center justify-between px-3 pb-3">
              {/* Left — reset */}
              <div className="h-7">
                <AnimatePresence>
                  {hasConversation && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={reset}
                      aria-label="Reset conversation"
                      title="Reset conversation"
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Right — send */}
              <button
                onClick={() => void sendMessage()}
                disabled={isLoading || !input.trim()}
                aria-label="Send message"
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-white transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-25"
              >
                {isLoading ? (
                  <Loader2
                    className="h-3.5 w-3.5 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
