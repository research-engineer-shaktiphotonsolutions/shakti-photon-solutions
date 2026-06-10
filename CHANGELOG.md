# CHANGELOG.md — Work History
## Shakti Photon Solutions Website

> Entries are newest-first. Each AI session should add an entry when work is completed.
> Format: `## [Date] — Brief title` followed by bullet points of what changed.

## [10 June 2026] — Director Addition & Image Format Optimization

### Director Addition (Dr. Manjeet Chhetri)
- Added **Dr. Manjeet Chhetri** as a **Director** of the company.
- Updated [about.html](file:///c:/Users/sahgy/Downloads/shakti-photon-solutions/about.html) with a profile card under the *Founders & Leadership* section, highlighting his PhD in Chemistry, Ex-LANL (Los Alamos National Laboratory) postdoctoral fellowship, Ex-JNCASR research background, and expertise in testing/materials design for electrolyzers and fuel cells (specifically electrocatalysts and membranes).
- Updated [index.html](file:///c:/Users/sahgy/Downloads/shakti-photon-solutions/index.html) stats leadership section with a matching mini-profile pill (`Director · PhD (Chemistry) · Ex-LANL`) for complete consistency.

### Image Optimization & Quality
- Restored the original high-resolution profile file from commit history and converted it to lossless `.png` format (`Dr. Manjeet.png`) to eliminate any compression blurriness.
- Updated [DECISIONS.md](file:///c:/Users/sahgy/Downloads/shakti-photon-solutions/DECISIONS.md) to record **ADR-011**, explaining the quality-compatibility trade-offs of using `.png` instead of `.jfif` or lossy compressed `.avif` for key high-visibility team photos.

---

## [9 June 2026] — Blog Article Navigation & Link Fix

### Blog Subdirectory Link Resolution
- Converted relative links (e.g. `pem-vs-aem-vs-alkaline-electrolyzer-india.html`) to root-relative paths (e.g. `/blog/pem-vs-aem-vs-alkaline-electrolyzer-india.html`) inside the blog index and all 5 individual article pages.
- Resolved a critical production bug where extensionless routing on Vercel (`/blog`) broke browser relative URL resolution, causing 404 errors for visitors clicking on articles.
- Verified that all article and navigation links now resolve correctly both in local development and production.

---

## [9 June 2026] — Milestones Timeline Alignment & Typo Fix

### Key Milestones Timeline
- Restructured and aligned the "Key Milestones" timeline in `about.html` to correctly incorporate the new **NIT Warangal Installation** event for 2024.
- Fixed HTML syntax/div nesting errors inside the timeline to ensure clean alignment on both desktop and mobile screens.
- Corrected a double "and" typo ("and and") in the description text.
- Pushed changes to GitHub and successfully deployed the verified fix to the live production server on Vercel.

---

## [9 June 2026] — Team Page Revamp, Blog, Nav Fix, Title Tag & Compound Docs

### Team Page Revamp (About Us)
- Updated team portraits in `about.html` to circular frames (`border-radius: 50%`) with elegant borders and hover animations to resolve close-up feedback.
- Rewrote `.team-grid` layout to use flexbox centering, ensuring cards align gracefully on all viewport sizes (e.g., centering the row of 2 in Core Team).
- Added **Our Core Team** section featuring: Noah Jacob (CTO), Haresh Shandilya (VP Business Head), Jan Nisa Ahad (Production Head), Gyan Kumar Sah (Production Engineer), and Mesa Sai Gagan (Production Engineer).
- Added **Our Advisory Team** section featuring: Dr. Jagadeesh Kalepu, Dr. Siddhartha Ghosh, and Lokesh Kumar (Advisors).
- Omitted bios for core/advisor cards to keep layout compact and balanced, highlighting names and roles.

### Blog — 5 Articles Published
- Created `blog/index.html` — article listing page with brand-consistent nav
- Created 5 full-length SEO articles (800–1200 words each) with Article JSON-LD:
  - `blog/pem-vs-aem-vs-alkaline-electrolyzer-india.html`
  - `blog/green-hydrogen-generator-cost-india.html`
  - `blog/equipment-as-a-service-hydrogen-research-india.html`
  - `blog/ccus-co2-reduction-india.html`
  - `blog/fuel-cell-systems-india.html`
- Created `blog/article.css` — shared styles for all article pages
- Each article: breadcrumb, callout boxes, comparison tables, enquiry CTA, WhatsApp button, related articles
- Added all 6 blog pages to `vite.config.js` as entry points
- Updated `sitemap.xml` — now 11 URLs

### Nav Bugs Fixed (blog pages)
- Blog pages were using emoji `⚡` instead of real `Icon.PNG` logo → fixed
- Logo text class was `nav-logo-primary` (CSS didn't exist) → fixed to `nav-logo-name`
- Hamburger ID was `hamburger` (JS couldn't find it) → fixed to `hamburger-btn`
- Script tag missing `type="module"` (Vite couldn't bundle) → fixed
- CTA button used wrong class `btn btn--gold nav-cta` → fixed to `nav-cta`
- Blog nav link added to all main site pages (index, products, about, contact, eaas)

### Title Tag Fix
- Homepage `<title>` updated: 'Green Hydrogen Generator Manufacturer India' → **'Enabling India's Net-Zero Goal | Shakti Photon Solutions'**
- `og:title` and `twitter:title` updated to match
- Rule documented in PROJECT.md § 10

### PowerPoint Presentation
- Generated `Shakti_Photon_Solutions_Website_Revamp_2026.pptx` (15 slides, 2.83 MB)
- Covers: problem, strategy, all 7 page screenshots with Vercel links, SEO architecture, tech stack, next steps
- Screenshots taken via Puppeteer (saved to brain scratch directory)

### Compound Engineering Docs Updated
- `PROJECT.md` — added blog pages table, title tag rules, brand positioning rules, 7 agent rules (§12)
- `CHANGELOG.md` — this entry
- `DECISIONS.md` — pending update (blog article format decision)

---

## [June 2026] — Compound Engineering Setup

- Created `AGENTS.md` — full AI behaviour rulebook for the project
- Created `PROJECT.md` — single source of truth (company, stack, credentials, patterns)
- Created `DECISIONS.md` — 10 architecture decision records with rationale
- Created `CHANGELOG.md` — this file
- Created `docs/COMPONENT_MAP.md` — maps every section of every page to file and line
- Created `docs/ROADMAP.md` — prioritised feature backlog (SEO/GEO first, no admin panel)
- Renamed `agents.md` → `AGENTS.md` (capitalized, expanded from 1 line to full rulebook)

---

## [June 2026] — Enquiry Modal with Confetti
- Added full enquiry modal system — popup triggered by `data-product` buttons (no page navigation)
- Modal injects itself into DOM lazily (only created on first open)
- Pre-fills dropdown + message based on product key
- Async form submission to Formspree `mnjypvga`
- Canvas confetti (160 particles, 8 colors) fires on successful submission
- WhatsApp CTA shown in success state
- Added 250+ lines of modal CSS to `css/main.css`
- Added 300+ lines of modal JS to `js/main.js` (section 10)
- Changed homepage product card `<a>` links → `<button data-product>` elements
- Changed EPC banner `<a>` → `<button data-product="epc">`
- EaaS page: sputtering, spray, hot-press, 3D printing buttons ready for modal

---

## [June 2026] — Formspree Integration
- Replaced `YOUR_FORM_ID` placeholder with real ID: `mnjypvga`
- Fixed critical bug: form was inside an accidental unclosed HTML comment (entire form was invisible)
- Removed empty "North India Office" card from contact.html offices strip
- Updated offices grid from 3-column to 2-column (Chennai + Guntur only)
- Updated offices copy: "three key hubs" → "key innovation hubs"

---

## [June 2026] — Mohali Removal
- Removed all mentions of Mohali office from:
  - `index.html` — JSON-LD schema, stats counter (3 → 2 offices)
  - `about.html` — research stat (3 → 2), timeline text, footer
  - `contact.html` — meta description, contact card, empty address tag
  - `products.html` — footer
- Updated about.html timeline: "Opened Guntur and Mohali offices" → "Opened Guntur office and expanded operations"

---

## [June 2026] — CCUS Integration + Enquiry Buttons on Cards
- Added CCUS card to homepage "What We Build" section
  - Image: plasma/CCUS image (compressed from 608 KB → 27 KB)
  - Specs: CO₂ → CO, Formic Acid & Ethylene; photochemical & electrochemical reactors
- Added "Enquire About" buttons to all 3 product cards and EPC banner
- Updated hero subtitle: "On-site hydrogen generators · fuel cell systems · CCUS"
- Updated contact.html dropdown: replaced "CO₂ Reduction Electrolyzer" with "CCUS — CO₂ Reduction System"
- Updated `main.js` pre-fill map: added `ccus` key

---

## [June 2026] — Image Compression
- Compressed all 3 product images (3D printer, ultrasonic spray nozzle, hot press)
- Compression: 3D Printer 66KB, Spray Nozzle 63KB, Hot Press 110KB (from multi-MB originals)
- Used `sharp` library for compression, overwrote original files in `public/assets/images/`

---

## [June 2026] — Smart URL Pre-fill on Contact Page
- `main.js` reads `?product=` and `?service=` URL parameters
- Maps parameter values to: dropdown selection + pre-written message
- Auto-scrolls to the form on page load
- Covered product keys: electrolyzers, fuelcells, ccus, epc, sputtering, spray-nozzle, hot-press, 3d-printing

---

## [June 2026] — Initial Website Build
- Replicated Wix website entirely in HTML + Vanilla CSS + Vanilla JS
- Set up Vite as bundler and dev server
- Created 5 pages: index, products, equipment-as-a-service, about, contact
- Deployed to Vercel: https://shakti-photon-solutions.vercel.app
- Added full SEO foundation:
  - `sitemap.xml` — all 5 pages
  - `robots.txt` — allows all crawlers
  - JSON-LD `Organization` schema on all pages
  - Open Graph + Twitter Card meta on all pages
  - Canonical URLs on all pages
- Design system: navy/royal/cyan/gold palette, Inter font, glassmorphism nav
- Hero: full-screen image with parallax, animated badge, trust badges
- Stats: animated counters (16+ years R&D, 50+ installations, etc.)
- Partner logos: IIT Hyderabad, IIT Delhi, NIT Warangal, RV College, GITAM, VIT AP, UoH, TIFR, CSIR-CGCRI
- Equipment as a Service page with 4 equipment cards
- About page: founder bios, timeline, research stats
- Contact page: Formspree form + office cards + WhatsApp CTA
