"use server";

import { headers } from "next/headers";

// ---------------------------------------------------------------------------
// In-memory rate limit — 5 submissions per IP per 10 minutes.
// Module-level Map persists across requests within a single serverless
// instance. Good enough for a personal portfolio; upgrade to Upstash/KV
// if you ever need cross-instance coordination.
// ---------------------------------------------------------------------------
const RL_MAX = 5;
const RL_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const rlStore = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rlStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rlStore.set(ip, { count: 1, resetAt: now + RL_WINDOW_MS });
    return false;
  }
  if (entry.count >= RL_MAX) return true;
  entry.count++;
  return false;
}

interface ContactInput {
  name: string;
  email: string;
  message: string;
}

interface ContactResult {
  success: boolean;
  error?: string;
}

export async function submitContact(
  data: ContactInput,
): Promise<ContactResult> {
  // Rate limit check — resolve IP from forwarded headers (Vercel sets x-forwarded-for)
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return {
      success: false,
      error: "Too many submissions. Please wait a few minutes and try again.",
    };
  }

  const { name, email, message } = data;

  if (!name.trim() || !email.trim() || !message.trim()) {
    return { success: false, error: "All fields are required." };
  }

  if (name.trim().length > 150)
    return { success: false, error: "Name is too long." };
  if (message.trim().length > 5000)
    return { success: false, error: "Message must be under 5000 characters." };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailPattern.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) {
    console.error("[contact] FORMSPREE_ENDPOINT is not set");
    return {
      success: false,
      error:
        "Contact form is not configured. Please email raffy7792@gmail.com directly.",
    };
  }

  const payload = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    message: message.trim(),
  };

  try {
    const formspreePromise = fetch(endpoint, {
      signal: AbortSignal.timeout(8000),
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    const n8nWebhookSecret = process.env.N8N_WEBHOOK_SECRET;
    const n8nPromise = n8nWebhookUrl
      ? fetch(n8nWebhookUrl, {
          signal: AbortSignal.timeout(8000),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(n8nWebhookSecret && { "x-webhook-secret": n8nWebhookSecret }),
          },
          body: JSON.stringify(payload),
        }).catch((err) => console.error("[contact] n8n webhook failed:", err))
      : Promise.resolve();

    const [formspreeRes] = await Promise.all([formspreePromise, n8nPromise]);

    if (!formspreeRes.ok) {
      const body = await formspreeRes.json().catch(() => ({}));
      const detail =
        (body as { error?: string }).error ?? `Status ${formspreeRes.status}`;
      console.error("[contact] Formspree error:", detail);
      return {
        success: false,
        error: "Failed to send your message. Please try again.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[contact] Fetch failed:", err);
    return {
      success: false,
      error: "Failed to send your message. Please try raffy7792@gmail.com.",
    };
  }
}
