"use server";

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
