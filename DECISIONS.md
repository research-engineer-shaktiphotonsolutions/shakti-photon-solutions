# DECISIONS.md — Architecture Decision Records
## Shakti Photon Solutions Website

> This file records WHY major decisions were made — not just what was done.
> Before changing any of these decisions, read the rationale and add a new ADR entry.

---

## ADR-001: Plain HTML/CSS/JS over a Framework (React, Vue, Next.js)
**Date:** June 2026
**Decision:** Use vanilla HTML, CSS, and JavaScript with Vite as a bundler.
**Why:**
- The site is primarily a marketing/brochure site — no dynamic data, no auth, no complex state
- Zero runtime overhead → faster page loads → better SEO Core Web Vitals
- Any AI model can read and modify HTML/CSS/JS without framework-specific knowledge
- Easier for the client to understand and maintain long-term
**Trade-off:** No component reuse across pages (nav/footer are duplicated in each HTML file)
**Future consideration:** If a blog is added with many pages, consider 11ty (static site generator) — NOT React

---

## ADR-002: Vite over Webpack / plain HTML
**Date:** June 2026
**Decision:** Use Vite for bundling and dev server
**Why:**
- Fast HMR during development (`npm run dev`)
- Handles asset hashing for cache busting on Vercel deployments
- Zero-config for a multi-page HTML app
- `vite.config.js` declares all HTML entry points explicitly
**Important:** Every new HTML page MUST be added to `vite.config.js` input object

---

## ADR-003: Vercel over Netlify / GitHub Pages
**Date:** June 2026
**Decision:** Deploy to Vercel
**Why:**
- Free tier is generous (100GB bandwidth)
- CLI deployment is one command: `vercel --prod`
- Excellent performance (edge CDN)
- Easy custom domain setup when ready
**Note:** The Vercel project is owned by the `shakti-photon-solutions` Vercel team account

---

## ADR-004: Formspree for Contact Form (Temporary)
**Date:** June 2026
**Decision:** Use Formspree (ID: `mnjypvga`) for form submissions
**Why:** Fastest path to a working form — zero backend, zero config, free tier
**Form endpoint:** `https://formspree.io/f/mnjypvga`
**Trade-off:** No server-side storage of submissions, no analytics, limited customisation
**Migration plan:** When ready, replace with a Supabase edge function. Client already has a Supabase account.
**Do not change the form ID** without updating `contact.html` AND `js/main.js` (modal form action)

---

## ADR-005: Enquiry Modal over Contact Page Navigation
**Date:** June 2026
**Decision:** Product card "Enquire" buttons open a pre-filled popup modal instead of navigating to contact.html
**Why:**
- Eliminates page navigation — customer stays on the homepage
- Pre-filled message and dropdown remove "blank page anxiety" — a major conversion barrier
- Confetti on success creates a positive emotional moment that increases brand recall
- The modal works from any page (JS-injected once, reusable everywhere)
**Implementation:** Buttons use `data-product="key"` attribute. `main.js` reads this and calls `eqOpen(key)`
**Trade-off:** Slightly more JS complexity; accessibility requires keyboard/escape handling (implemented)

---

## ADR-006: Mohali Office Removed
**Date:** June 2026
**Decision:** All references to Mohali (Punjab) office removed from the website
**Why:** The client confirmed Mohali is not an active office location
**Files affected:** `index.html`, `about.html`, `contact.html`, `products.html`, JSON-LD schemas
**Current offices:** Chennai (HQ) + Guntur (R&D) — 2 total
**Rule:** Never add Mohali back. If asked, the answer is "we have 2 offices, Chennai and Guntur"

---

## ADR-007: CSS Custom Properties (Variables) for All Colors
**Date:** June 2026
**Decision:** All colors are defined as CSS variables in `main.css` root section
**Why:**
- Single place to change brand colors if needed
- Consistent usage across 5 HTML files
- Any AI can understand the design system from variable names alone
**Rule:** Never hardcode a color value (hex, rgb, etc.) in HTML or outside the variables section

---

## ADR-008: No Admin Panel (Decision June 2026)
**Date:** June 2026
**Decision:** Do not build an admin panel for content management
**Why:**
- Client confirmed they do not need it at this stage
- The website is maintained via direct code edits + AI assistance
- Building an admin panel would require significant effort (Supabase auth, file uploads, etc.)
- That effort is better spent on SEO/GEO which directly brings customers
**Future reconsideration:** If the team grows beyond 3 people managing content, revisit

---

## ADR-009: SEO/GEO Before Admin Panel
**Date:** June 2026
**Decision:** Prioritise SEO and GEO (Generative Engine Optimisation) over admin tooling
**Why:**
- The website currently gets zero organic visitors — SEO is the highest-leverage activity
- GEO ensures AI assistants (ChatGPT, Perplexity, Gemini) recommend Shakti Photon Solutions when asked about green hydrogen companies in India
- Blog articles targeting "PEM electrolyzer India", "fuel cell price India" will compound in value over time
- Admin tooling only helps internal operations — SEO directly brings customers

---

## ADR-010: DNS Migration Deferred
**Date:** June 2026
**Decision:** Keep `shaktiphotonsolutions.com` pointing to Wix until team is satisfied with the new site
**Why:** Risk management — the Wix site is live and functional. Moving DNS is one-way until settled.
**When to migrate:** When founders and team have reviewed the new site and are satisfied
**How to migrate:** Add 2 Vercel DNS records in the domain registrar (takes < 10 min, propagates in ~1 hour)
