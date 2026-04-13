import { NextRequest, NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { AI_SYSTEM_PROMPT } from "@/data/ai-context";

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

// ─── In-memory rate limiter ──────────────────────────────────────────────────
// Resets on cold start — good enough for a personal portfolio.
// Swap for Upstash Redis / Vercel KV before high-traffic launch.
const rateLimiter = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimiter.get(ip);

  if (!record || now > record.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count++;
  return true;
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

  // Rate limit by IP
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again in an hour." },
      { status: 429 },
    );
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
    const response = await anthropic.messages.create({
      model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-20250514",
      max_tokens: 512,
      system: AI_SYSTEM_PROMPT,
      messages: sanitized,
    });

    const block = response.content[0];
    const reply = block.type === "text" ? block.text : "";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[api/chat] Anthropic error:", err);
    return NextResponse.json(
      { error: "Failed to generate a response. Please try again." },
      { status: 500 },
    );
  }
}
