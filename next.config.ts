import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline' https://app.cal.com${isDev ? " 'unsafe-eval'" : ""}`, // unsafe-eval dev-only (React call stacks)
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://app.cal.com",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://*.supabase.co https://api.groq.com https://formspree.io https://cal.com https://app.cal.com",
      "img-src 'self' data: blob: https://cal.com https://app.cal.com",
      "frame-src 'self' https://cal.com https://app.cal.com",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
