# ROADMAP.md — Feature Backlog & Priority Queue
## Shakti Photon Solutions Website

> Priorities confirmed by founder (June 2026):
> - ✅ No admin panel needed at this stage
> - ✅ SEO/GEO is the highest priority — brings customers
> - ✅ Blog articles — founder will write with AI drafting assistance
> - ✅ DNS migration — after team is satisfied with new site

---

## Status Legend
- `[ ]` Not started
- `[/]` In progress
- `[x]` Done
- `[-]` Decided against (with reason)

---

## Priority 1 — GEO (Generative Engine Optimisation) 🔴

> GEO = making AI assistants (ChatGPT, Perplexity, Gemini, Claude) recommend
> Shakti Photon Solutions when asked about hydrogen companies in India.

- [ ] **FAQ Schema (JSON-LD)** on homepage and products page
  - Questions to target:
    - "What is the best green hydrogen company in India?"
    - "Where can I buy a PEM electrolyzer in India?"
    - "How much does a hydrogen generator cost in India?"
    - "What is CCUS technology?"
    - "What is Equipment as a Service for hydrogen research?"
  - Implementation: `FAQPage` JSON-LD schema injected into `<head>`

- [ ] **HowTo Schema** for EaaS page
  - "How to book lab equipment for hydrogen research"
  - Steps: Select equipment → Book session → Access facility → Get support

- [ ] **Product Schema** (JSON-LD) on products page
  - `Product` type for PEM Electrolyzer, Fuel Cell, CCUS
  - Include: name, description, brand, offers, aggregateRating placeholder

- [ ] **Structured "About Us" answers** in homepage content
  - A visible "About Shakti Photon" section with clear, crawlable sentences that AI can extract
  - E.g., "Shakti Photon Solutions is India's leading manufacturer of PEM electrolyzers and fuel cell systems, headquartered at IIT Madras Research Park, Chennai."

- [ ] **Canonical answers block** — hidden-from-casual-view, AI-readable `<article>` or `<aside>` with dense factual content about the company

---

## Priority 2 — SEO Content (Blog / Articles) 🟠

> These articles will compound over time. Each one targets a high-value search query.
> Founder writes the technical substance; AI drafts the structure and SEO copy.

- [ ] **Article 1:** "PEM Electrolyzer vs AEM vs Alkaline: Which Is Right for Your Application?"
  - Target keyword: "PEM electrolyzer vs alkaline India"
  - Length: ~1200 words

- [ ] **Article 2:** "How Much Does a Green Hydrogen Generator Cost in India? (2025 Guide)"
  - Target keyword: "hydrogen generator price India"
  - Length: ~1000 words

- [ ] **Article 3:** "What is Equipment as a Service (EaaS) for Hydrogen Research?"
  - Target keyword: "equipment as a service hydrogen India"
  - Length: ~900 words

- [ ] **Article 4:** "CCUS in India: Converting CO₂ into Valuable Chemicals with Electrochemistry"
  - Target keyword: "CCUS India electrochemical CO2 reduction"
  - Length: ~1100 words

- [ ] **Article 5:** "Fuel Cell Systems for Backup Power, Drones, and Transport: India's Options"
  - Target keyword: "fuel cell system India backup power"
  - Length: ~1000 words

- [ ] **Blog page:** Create `blog.html` with article index
  - Add to `vite.config.js` input list
  - Add to `sitemap.xml`
  - Add to `robots.txt` (already allows all)
  - Add to nav menu

- [ ] **Individual article pages:** `blog/article-slug.html` × 5
  - Each with: Article schema (JSON-LD), canonical, Open Graph, estimated read time

---

## Priority 3 — On-Site Conversion Improvements 🟡

- [ ] **Ticker/Announcement Bar** — below navbar, above page content
  - Scrolling text with company highlights
  - E.g.: "🚀 New: 100W PEM Electrolyzer · 24/7 Technical Support · IIT Madras Incubated · ✅ CLIMAFIX 2024 Finalist"
  - Static initially; editable later when admin is built
  - Close button (stores in sessionStorage)

- [ ] **Landing Popup** — first-time visitor only (sessionStorage check)
  - Appears 3 seconds after landing
  - "What are you looking for?" with 3 quick options:
    - 🔬 Research Equipment → opens EaaS modal
    - ⚡ Hydrogen Generator → opens Electrolyzers modal  
    - 💼 Full Project (EPC) → opens EPC modal
  - Subtle, non-intrusive design (not blocking)

- [ ] **WhatsApp floating button** — fixed bottom-right on all pages
  - Green circle with WhatsApp icon
  - Opens `wa.me/917382025117` with a context-aware pre-written message
  - Should appear after 5 seconds on page

- [ ] **Exit-intent popup** — when cursor moves toward browser close button
  - Simple: "Before you go — get a free quote via WhatsApp"
  - One click to WhatsApp

---

## Priority 4 — Technical SEO Improvements 🟡

- [ ] **Google Search Console setup**
  - Verify ownership with HTML meta tag (add to all pages' `<head>`)
  - Submit `sitemap.xml`
  - Monitor for crawl errors

- [ ] **Core Web Vitals audit**
  - Run Lighthouse in Chrome DevTools
  - Target: LCP < 2.5s, CLS < 0.1, FID < 100ms
  - Main risk: large images (several > 400KB in `dist/assets`)

- [ ] **Image lazy loading audit**
  - Ensure all below-fold images have `loading="lazy"`
  - Convert large PNGs to WebP where possible

- [ ] **Update `sitemap.xml` dates** after each major update
  - Currently showing June 2026 dates — keep current

- [ ] **robots.txt improvements**
  - Currently: basic allow-all
  - Add: block `/dist/`, block `/*.json`

---

## Priority 5 — Infrastructure 🟢

- [ ] **DNS Migration** — `shaktiphotonsolutions.com` → Vercel
  - **Blocker:** Team satisfaction with new site (not yet signed off)
  - **When ready:** Add 2 DNS records in domain registrar
    - `A` record: `76.76.21.21`
    - `CNAME` record: `cname.vercel-dns.com`
  - **Expected propagation:** 1–24 hours

- [ ] **Supabase form submission database**
  - Replace Formspree `mnjypvga` with Supabase Edge Function
  - Store all form submissions in a `leads` table
  - Trigger email notification on new submission
  - Client has existing Supabase account
  - **Blocker:** Not needed until volume exceeds Formspree free tier (50/month)

- [ ] **Analytics**
  - Add Plausible Analytics (privacy-friendly, no cookies, free self-host or $9/mo)
  - OR Google Analytics 4 (free, more data)
  - Recommended: Start with Plausible — simpler, no consent banner needed

---

## Decided Against / Deferred

- `[-]` **Admin panel** — decided against in June 2026 (ADR-008). Revisit if team grows.
- `[-]` **React/Next.js** — decided against in June 2026 (ADR-001). Vanilla HTML is fine for this site.
- `[-]` **Wix hosting** — moved to Vercel; Wix domain still active pending DNS migration.

---

## Notes for Future AI Sessions

When starting a new session to work on this roadmap:
1. Pick the top unchecked item from Priority 1 or 2
2. Tell the user what you plan to do before doing it
3. After completing, mark `[x]` in this file and add a `CHANGELOG.md` entry
4. Deploy with `vercel --prod`
