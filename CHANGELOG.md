# CHANGELOG.md — Work History
## Shakti Photon Solutions Website

> Entries are newest-first. Each AI session should add an entry when work is completed.
> Format: `## [Date] — Brief title` followed by bullet points of what changed.

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
