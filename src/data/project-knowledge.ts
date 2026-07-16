/**
 * Server-only: imported by /api/chat, never shipped to the client bundle.
 *
 * Extra prose per project — the AI answers from this PLUS the structured facts
 * in projects.ts (name, description, stack, role, links), which are merged at
 * prompt-build time. Don't duplicate those facts here; write the story instead:
 * why it was built, how it works, challenges, outcomes.
 *
 * Keys must match project ids in projects.ts (checked at module load in dev).
 * Search "TODO:" for parts that need Raffy's own voice.
 */
export const PROJECT_KNOWLEDGE: Partial<Record<string, string>> = {
  oneclick: `OneClickPost (live at oneclickpost.co) is Raffy's flagship SaaS product — designed, built, shipped, and maintained entirely by him, end to end.
What it does: lets users publish content to Facebook, Instagram, LinkedIn, and X (Twitter) simultaneously in one click. It supports three posting modes: Manual (write and post directly), AI-assisted (generate captions with AI before publishing), and Video posting.
The stack: frontend is Next.js + TypeScript + Tailwind CSS + Magic UI. Backend is Go (API) + PostgreSQL, with a separate self-hosted n8n instance handling the automation workflows and webhook pipelines. The whole product lives in a monorepo containing the landing pages, the API, and the dashboard — with n8n self-hosted separately.
How publishing works: posts are dispatched to all platforms in parallel using native platform APIs (Meta Graph API for Facebook/Instagram, LinkedIn API, X API), so one platform failing doesn't block the others — each platform reports its own success/failure status back to the user.
Why it matters: it's the strongest proof of Raffy's full-stack range — product design, frontend development, a Go API, and backend automation in a single shipped, live product. It also doubles as the publishing engine for his own content across social channels.
If visitors ask about pricing, roadmap, or trying it: point them to oneclickpost.co or raffy7792@gmail.com.`,

  "n8n-automation": `A body of production automation work built on a self-hosted n8n instance (DigitalOcean) — AI integrations, webhook pipelines, and third-party API connections powering real business processes. This is Raffy's strongest freelance niche; his Contra profile gained notable traction specifically around n8n automation content.
Sample build — "Jarvis": a fully voice-based AI receptionist for Prime Tech Guyana, built with Vapi, n8n, Google Calendar, and Twilio. It handles appointment booking, rescheduling, and cancellations through natural phone conversation, with real-time availability checking against the calendar. Delivered as a complete client engagement — proposal, demo, deployment, and handover — including solving tricky production details like timezone handling (America/Guyana, UTC-4), preventing double-bookings, and correcting the AI's misinterpretation of spoken times.
Other production builds: a WhatsApp appointment bot (n8n + Twilio + Google Calendar), a Meta ads automation pipeline (scraping → AI-generated ad creative → deployment via the Graph API), a Cal.com booking lifecycle automation, and an AI news scout workflow combining RSS feeds with Tavily search.
Reliability work worth mentioning: Raffy runs this infrastructure himself and has debugged real production issues — API version expiries, rate/quota exhaustion, and OAuth token lifetimes (migrating Google integrations to service accounts to eliminate 7-day token expiry).
Why it matters: this isn't tutorial-level automation — it's client-facing systems handling live bookings and publishing, with the operational maturity to keep them running. For automation project inquiries, point visitors to raffy7792@gmail.com.`,

grb: `A business web application for GRB Enterprises Inc. (live at grb.com.ph), built with Laravel, Tailwind CSS, PHP, and MySQL — developed and deployed by Raffy together with a friend through their agency, RRM.
Raffy's role: frontend developer. He implemented the admin dashboard, user management screens, and the day-to-day business operation flows — translating the design into responsive, production Tailwind UI on top of the Laravel backend.
The strongest proof point: the application is still live and in daily use by GRB Enterprises today — a production system that has kept running, not a demo or a handoff that died after launch.
Why it matters: it shows Raffy delivering real business software as part of a small team, working in a PHP/Laravel codebase outside his usual Next.js stack — proof he adapts to the right stack for the client rather than forcing his own.
For specifics about this engagement (scope, timeline, outcomes), point visitors to raffy7792@gmail.com.`,

lotto: `A modern lottery/gaming platform back office built with React and TypeScript — a real-time admin interface covering game configuration, payout settings, and operational dashboards for platform administrators.
Raffy's role: UI/UX and frontend developer, translating Figma designs into production components. The work spans complex admin surfaces — product configuration, payout config, risk breakdown computation, round management (opening rounds, award results), and ticket information views — with permission-based UI so different admin roles see only what they're allowed to manage.
The stack: Next.js 14.2, React 18, and TypeScript 5.7, with MUI v5 (including MUI X DataGrid Pro/Premium and Tree View Pro) for the data-heavy admin surfaces. Forms are react-hook-form + Yup validation; auth and permissions use CASL abilities with JWT; internationalization via i18next (Thai default, English). Charting with ApexCharts/Chart.js/Recharts, and tooling includes Jest + Testing Library, ESLint 9 + Prettier, and Husky + lint-staged.
Why it matters: gaming/lottery back offices are dense, data-heavy, and unforgiving — this work shows Raffy handling enterprise-grade tables (DataGrid Pro), role-based access control, multilingual UI, and financial computation screens, not just marketing pages.
For details about this work, point visitors to raffy7792@gmail.com.`,

"game-ui": `UI/UX design for "StreamZ", a mobile live-streaming gaming application — a full app design created in Figma with a dark theme and dynamic visual elements suited to gaming content.
Raffy's role: end-to-end UI/UX design — screen flows, visual language, and component styling for the mobile experience. The dark theme with vibrant accents is a deliberate choice for a streaming context, where the UI needs to recede and let live video content dominate.
Where to see it: the full case study is published on Behance.
Why it matters: alongside the lottery back office and OneClickPost, this shows the design side of Raffy's range — he doesn't just implement Figma files handed to him, he can produce them. That design-to-code fluency is why his frontend work tends to match the intended design closely.
For questions about whether this shipped or the client context, point visitors to raffy7792@gmail.com.`,

moscot: `A complete original character design package — a set of monster mascot characters taken from rough concept to finished, ready-to-use assets.
What's in the package: initial concept sketches, polished vector illustrations, custom color palettes per character, and multiple expressive poses for each — the kind of full asset set a brand or content creator could drop straight into use (mascots, stickers, stream assets, social content).
Tools and craft: illustrated entirely in Adobe Illustrator, drawing on Raffy's years of professional vector work, including microstock illustration — where art has to be clean, versatile, and production-ready to sell.
Where to see it: the full character set is published on Behance.
Why it matters: it rounds out the picture — Raffy isn't only a developer who designs interfaces, he's a trained illustrator. That range shows up in his product work: OneClickPost and his client projects get original visual assets without needing to hire out.
For character design or illustration inquiries, point visitors to raffy7792@gmail.com.`,

"travel-portal": `Web design for a travel booking portal — a complete design covering the core booking journey: flight and hotel search, results and filtering, booking flows, and payment screens, all designed in Figma.
Raffy's role: UI/UX design for the full user journey. Travel booking is one of the harder UX domains — dense search results, date/passenger selectors, multi-step checkout — and the design focuses on keeping that complexity feeling simple and friendly for the user.
Where to see it: the full design case study is published on Behance.
Why it matters: booking flows are conversion-critical — every confusing step costs a sale. This project shows Raffy designing for transactional, multi-step user journeys, the same skill that carries into his SaaS and dashboard work.
For client context and project details, point visitors to raffy7792@gmail.com.`,

rrm: `RRM is the small development agency/partnership Raffy runs with a friend — the team behind real client software that's still in production today.
Flagship delivery: the GRB Enterprises Inc. business web application (live at grb.com.ph), built with Laravel, Tailwind CSS, PHP, and MySQL. RRM handled the full delivery — development through deployment — and the system remains in daily use by the client.
How it works: RRM operates as a three-person team, with Raffy covering frontend development and UI/UX. It's the collaborative, agency-style counterpart to his solo freelance work under Nulls Collection.
Why it matters: shipping and maintaining production software for a real business as a small agency requires the full lifecycle — scoping, building, deploying, and supporting. It's a different proof point than solo projects.
For inquiries about agency-style engagements or RRM's work, point visitors to raffy7792@gmail.com.`,

  logo: `A collection of logo and brand mark explorations created in Adobe Illustrator — part of Raffy's branding and identity design work.`,

christmas: `A personal Christmas-themed design set — holiday concepts, mockups, profile assets, and social media graphics. Raffy made this when he was bored — no client, no brief, just him playing with a holiday theme for fun.
Even as a boredom project, it shows how he approaches a seasonal idea: one cohesive visual concept carried across multiple formats (avatars, banners, posts, mockups).
Why it's here: personal work like this is where style experiments happen — and it shows the design habit runs deeper than paid work.
For design inquiries, point visitors to raffy7792@gmail.com.`,

halloween: `A personal Halloween illustration set — original spooky-themed digital art. Another one Raffy made when he was bored — he gets an idea, opens Illustrator, and a themed art set comes out.
Not client work — pure hobby illustration, showing his darker, more atmospheric range alongside the character work in the monster mascot package.
Why it's here: it rounds out his illustration style range — from clean mascot vectors to moodier seasonal art.
For illustration inquiries, point visitors to raffy7792@gmail.com.`,

sonic: `A Sonic-themed fan art illustration series — yep, Raffy made this when he was bored too. Drawn purely for fun, because he enjoys illustrating even when nobody's paying him.
Fan art, not client work — which honestly says as much as anything else here: the guy designs and draws for the love of it.
Why it's here: it shows illustration style and range, and that his creative work isn't only transactional.
For illustration inquiries, point visitors to raffy7792@gmail.com.`,

};
