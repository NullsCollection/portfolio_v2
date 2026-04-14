import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { groq } from "@/lib/groq";
import { AI_SYSTEM_PROMPT } from "@/data/ai-context";

// ─── Rate limiter (Upstash Redis — survives cold starts & multi-instance) ────
// Falls back to a no-op when env vars are absent (local dev without Redis).
const ratelimit =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(10, "1 h"),
        analytics: true,
        prefix: "portfolio:chat",
      })
    : null;

// ─── CORS ────────────────────────────────────────────────────────────────────
const PRODUCTION_ORIGIN = process.env.NEXT_PUBLIC_SITE_URL;

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  if (origin === PRODUCTION_ORIGIN) return true;
  if (
    process.env.NODE_ENV === "development" &&
    origin.startsWith("http://localhost")
  )
    return true;
  return false;
}

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type",
});

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return new NextResponse(null, { status: 403 });
  }
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin!) });
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

// ─── Route handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  // CORS origin check
  const origin = req.headers.get("origin");
  if (!isAllowedOrigin(origin)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  // Rate limit by IP (Upstash sliding window — works across all instances)
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (ratelimit) {
    const { success, remaining } = await ratelimit.limit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in an hour." },
        { status: 429, headers: { "X-RateLimit-Remaining": String(remaining) } },
      );
    }
  }

  // Parse and validate body
  let body: RequestBody;
  try {
    body = (await req.json()) as RequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { messages } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages array is required." },
      { status: 400 },
    );
  }

  // Sanitize — only pass valid roles, max 40 turns
  const sanitized = messages
    .filter(
      (m): m is ChatMessage =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-40) // cap conversation length
    .map(({ role, content }) => ({ role, content: content.slice(0, 2000) }));

  if (sanitized.length === 0) {
    return NextResponse.json(
      { error: "No valid messages provided." },
      { status: 400 },
    );
  }

  try {
    const completion = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
      max_tokens: 512,
      messages: [
        { role: "system", content: AI_SYSTEM_PROMPT },
        ...sanitized,
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[api/chat] Groq error:", err);
    return NextResponse.json(
      { error: "Failed to generate a response. Please try again." },
      { status: 500 },
    );
  }
}
