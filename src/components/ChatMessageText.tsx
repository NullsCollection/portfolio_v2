import type { ReactNode } from "react";

/**
 * Minimal formatter for chat replies — bold, bullets, and auto-linked
 * URLs/emails. Deliberately not a markdown parser: the system prompt keeps
 * replies plain, and this exists so a stray `**` or a bare domain renders as
 * something a human wants to read instead of literal punctuation.
 */

/** Allowlisted TLDs, so "Next.js" and "React.js" don't become links. */
const TLD = "com|net|org|io|dev|tech|art|app|ai|co|ph|xyz|me|sh|gg";

const INLINE = new RegExp(
  String.raw`\*\*([^*]+)\*\*` + // **bold**
    String.raw`|([\w.+-]+@[\w-]+\.[\w-]+)` + // email (before url, so gmail.com isn't split off)
    String.raw`|((?:https?://)?(?:[\w-]+\.)+(?:${TLD})\b(?:/\S*)?)`, // url or bare domain
  "gi",
);

/** Sentence punctuation that must not get swallowed into an href. */
const TRAILING = /[.,;:!?)\]]+$/;

const LINK_CLASS =
  "underline underline-offset-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]";

function formatInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  INLINE.lastIndex = 0;
  while ((match = INLINE.exec(text)) !== null) {
    if (match.index > cursor) out.push(text.slice(cursor, match.index));

    const [full, bold, email, url] = match;
    const key = `${keyPrefix}-${match.index}`;

    if (bold) {
      out.push(<strong key={key}>{bold}</strong>);
    } else if (email) {
      out.push(
        <a key={key} href={`mailto:${email}`} className={LINK_CLASS}>
          {email}
        </a>,
      );
    } else if (url) {
      const tail = url.match(TRAILING)?.[0] ?? "";
      const clean = tail ? url.slice(0, -tail.length) : url;
      out.push(
        <a
          key={key}
          href={clean.startsWith("http") ? clean : `https://${clean}`}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK_CLASS}
        >
          {clean}
        </a>,
      );
      if (tail) out.push(tail);
    }

    cursor = match.index + full.length;
  }

  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

export function ChatMessageText({ text }: { text: string }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];

  const flushBullets = () => {
    if (bullets.length === 0) return;
    const items = bullets;
    bullets = [];
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="list-disc space-y-0.5 pl-4">
        {items.map((item, i) => (
          <li key={i}>{formatInline(item, `li-${blocks.length}-${i}`)}</li>
        ))}
      </ul>,
    );
  };

  for (const line of text.split("\n")) {
    // A bullet marker needs a trailing space, so "**Design:**" isn't mistaken for one.
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    if (bullet) {
      bullets.push(bullet[1]);
      continue;
    }

    flushBullets();
    if (line.trim() === "") continue;
    blocks.push(
      <p key={`p-${blocks.length}`}>{formatInline(line, `p-${blocks.length}`)}</p>,
    );
  }
  flushBullets();

  return <div className="space-y-2">{blocks}</div>;
}
