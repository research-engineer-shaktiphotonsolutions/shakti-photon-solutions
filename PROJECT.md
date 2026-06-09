# PROJECT.md — Single Source of Truth
## Shakti Photon Solutions Private Limited

> **Any AI starting work on this project must read this file first.**
> It contains everything needed to understand the company, the codebase, and how to continue.

---

## 1. Company Overview

**Shakti Photon Solutions Private Limited** is an Indian deep-tech startup building hardware for India's net-zero transition. Founded by scientists (not just engineers), the company:

- **Builds and sells** on-site hydrogen generators (PEM, AEM, Alkaline electrolyzers), fuel cell systems, and CCUS (Carbon Capture, Utilisation & Storage) equipment
- **Runs Equipment as a Service (EaaS)** — renting lab equipment (RF Sputtering, Ultrasonic Spray Nozzle, Hot Press, 3D Printing) to researchers by the session
- **Targets** industry, research institutions, government projects, and EPC contractors
- **Offers 24/7 technical support**

### Founders
| Name | Role |
|---|---|
| Dr. Mallikarjuna | CEO / Co-founder (NUS, Uppsala, IIT Kanpur background) |
| Dr. Sravani | Co-founder |

### Partner Institutions
IIT Hyderabad, IIT Delhi, NIT Warangal, RV College of Engineering, GITAM, VIT AP, University of Hyderabad, TIFR, CSIR-CGCRI

### Key Achievements
- Finalist at CLIMAFIX 2024 (India's Largest Climate Startup Summit, IIT Madras)
- 16+ years of global R&D experience across the founding team
- Active installations across India

---

## 2. Offices

| Location | Type | Address |
|---|---|---|
| Chennai, Tamil Nadu | **Headquarters** | IIT Madras Research Park, Taramani, Chennai — 600 113 |
| Guntur, Andhra Pradesh | R&D Centre | JC Bose Block, SRM AP University Campus, Guntur — 522 502 |

> ⚠️ **Only 2 offices.** Mohali was removed in June 2026 — never add it back.

---

## 3. Contact Details

| Channel | Value |
|---|---|
| Phone / WhatsApp | +91 73820 25117 |
| Email | info@shaktiphotonsolutions.com |
| LinkedIn | https://www.linkedin.com/company/shakti-photon-solutions-private-limited/ |
| WhatsApp direct | https://wa.me/917382025117 |

---

## 4. Website Purpose

The website's **primary goal** is lead generation — customers must be able to enquire within 3 clicks from landing. **Secondary goal:** SEO/GEO visibility so the site appears when people search for:

- "green hydrogen" / "green hydrogen company India"
- "fuel cell" / "fuel cell system India"
- "net zero enabler" / "net zero company India"
- "carbon capture company" / "carbon capture utilization and storage company"
- "MEA manufacturer" / "MEA manufacturing India"
- "PEM electrolyzer" / "PEM electrolyzer manufacturer India"
- "CCUS India" / "CCUS companies India"
- "hydrogen generator India"

The original Wix website was rebuilt from scratch in HTML/CSS/JS for full flexibility, better SEO, and free hosting.


---

## 5. Tech Stack (Frozen Decisions — Do Not Change Without Adding a DECISIONS.md Entry)

| Tool | Purpose | Notes |
|---|---|---|
| HTML + Vanilla CSS + Vanilla JS | Core stack | No framework by design — simplicity & speed |
| Vite | Bundler / Dev server | `npm run dev` → localhost:5173 |
| Vercel | Hosting / CDN | Auto-deploy from CLI with `vercel --prod` |
| Formspree | Contact form | Form ID: `mnjypvga`. Endpoint: `https://formspree.io/f/mnjypvga` |
| Supabase | Future use | Account exists. Will replace Formspree when admin panel is built |
| Git | Version control | Standard git workflow |

---

## 6. Live URLs

| Environment | URL |
|---|---|
| Production (Vercel alias) | https://shakti-photon-solutions.vercel.app |
| Custom domain (pending DNS) | https://www.shaktiphotonsolutions.com |

> DNS migration from Wix → Vercel is **pending**. Do not push the team to migrate until they are satisfied with the new site. When ready, add 2 DNS records in the domain registrar pointing to Vercel.

---

## 7. Pages

| Page | File | Route | Purpose |
|---|---|---|---|
| Home | `index.html` | `/` | Hero, product cards, stats, partners, FAQ, enquiry CTA |
| Products | `products.html` | `/products` | Full product specs and EaaS details |
| Equipment as a Service | `equipment-as-a-service.html` | `/equipment-as-a-service` | Session booking for lab equipment |
| About | `about.html` | `/about` | Team bios, company timeline, research stats |
| Contact | `contact.html` | `/contact` | Contact form (Formspree), office info |
| Blog Index | `blog/index.html` | `/blog` | Article listing (5 articles published June 2026) |
| Article: PEM vs AEM | `blog/pem-vs-aem-vs-alkaline-electrolyzer-india.html` | `/blog/pem-vs-aem-vs-alkaline-electrolyzer-india` | Electrolyzer comparison |
| Article: H2 Cost | `blog/green-hydrogen-generator-cost-india.html` | `/blog/green-hydrogen-generator-cost-india` | Price guide India |
| Article: EaaS | `blog/equipment-as-a-service-hydrogen-research-india.html` | `/blog/equipment-as-a-service-hydrogen-research-india` | EaaS explainer |
| Article: CCUS | `blog/ccus-co2-reduction-india.html` | `/blog/ccus-co2-reduction-india` | CCUS electrochemistry |
| Article: Fuel Cells | `blog/fuel-cell-systems-india.html` | `/blog/fuel-cell-systems-india` | Fuel cell applications |

All pages are declared as entry points in `vite.config.js`. New HTML pages MUST be added there.

> **Blog CSS:** Shared styles for all blog article pages live in `blog/article.css`.
> Blog index uses inline `<style>` block inside `blog/index.html`.

---

## 8. CSS Design System

All tokens are in `css/main.css` lines ~1–60.

| Variable | Value | Use |
|---|---|---|
| `--navy` | `#1B2D6E` | Primary brand color, headings |
| `--navy-dark` | `#0F1E50` | Dark sections bg |
| `--royal` | `#2D4DE0` | Buttons, links |
| `--cyan` | `#00B4D8` | Accents, spec item checkmarks |
| `--gold` | `#F59E0B` | CTAs, stat numbers, highlights |
| `--white` | `#FFFFFF` | |
| `--text` | `#334155` | Body text |
| `--text-muted` | `#64748B` | Labels, subtitles |
| `--border` | `#E2E8F0` | Card borders |
| `--bg-alt` | `#F8FAFC` | Section alternating background |

---

## 9. JavaScript Architecture (`js/main.js`)

All JS lives in one file, inside a single `DOMContentLoaded` listener. Sections:

| Section | Approx. Line | Purpose |
|---|---|---|
| 1. Stat counters | ~20 | Animates numbers in stats section |
| 2. Scroll reveal | ~50 | IntersectionObserver → `.reveal` class |
| 3. Nav / hamburger | ~80 | Sticky nav, mobile menu |
| 4. Contact form | ~120 | Handles contact.html form submission |
| 5. Hero parallax | ~145 | Subtle parallax on hero bg |
| 6. Counter trigger | ~155 | Fires counters when stats section is visible |
| 7. URL pre-fill | ~170 | Reads `?product=` or `?service=` → pre-fills contact form |
| 8. Partner stagger | ~242 | Staggered reveal delay for partner logos |
| 9. Active nav | ~248 | Highlights current section in nav |
| 10. Enquiry modal | ~270 | Full modal system + confetti (see below) |

### Enquiry Modal System
- **Trigger:** Any element with `data-product="key"` attribute
- **Data map:** `eqProductData` object at line ~275 — maps product keys to {tag, title, subtitle, select, msg}
- **Product keys:** `electrolyzers`, `fuelcells`, `ccus`, `epc`, `sputtering`, `spray-nozzle`, `hot-press`, `3d-printing`
- **Submission:** Async fetch → Formspree → on success: confetti fires, form hides, success state shows
- **Confetti:** 160 canvas particles, full-screen `position:fixed` canvas at z-index 10100
- **Close:** ✕ button, backdrop click, or Escape key

---

## 10. Key SEO Setup (Already Done)

- `sitemap.xml` — **11 URLs** listed (6 core pages + 5 blog articles)
- `robots.txt` — allows all crawlers, references sitemap
- JSON-LD `Organization` schema on all pages
- `FAQPage` JSON-LD schema on homepage (10 Q&As) — read by AI assistants (GEO)
- `Article` JSON-LD schema on every blog article
- Open Graph + Twitter Card meta tags on all pages
- Canonical URLs on all pages
- Semantic HTML structure (h1, h2, h3 hierarchy)
- Visible FAQ section on homepage with `itemscope`/`itemprop` microdata

### Page Titles (browser tab + Google snippet)
> **Rule:** The `<title>` tag controls (1) browser tab, (2) Google headline, (3) og:title controls LinkedIn/WhatsApp share, (4) twitter:title controls X/Twitter share.
> All 3 must be updated together when changing brand positioning.
- **Homepage title:** "Enabling India's Net-Zero Goal | Shakti Photon Solutions" (updated June 2026, was 'Green Hydrogen Generator Manufacturer India')
- **Products:** "Products — PEM, AEM & Alkaline Electrolyzers | Shakti Photon Solutions"
- **EaaS:** "Equipment as a Service | Shakti Photon Solutions"
- **About:** "About Us | Shakti Photon Solutions"
- **Contact:** "Contact Us | Shakti Photon Solutions"
- **Blog:** "Green Hydrogen & CCUS Blog | Shakti Photon Solutions"

### Target Keywords
- **Primary:** "green hydrogen company India", "green hydrogen generator India", "PEM electrolyzer India", "fuel cell system India", "fuel cell India"
- **Secondary:** "CCUS India", "carbon capture company India", "carbon capture utilization and storage India", "net zero enabler India", "MEA manufacturer India", "MEA manufacturing India"
- **Long-tail:** "PEM electrolyzer manufacturer India", "alkaline electrolyzer India", "AEM electrolyzer India", "on-site hydrogen generator India", "hydrogen fuel cell backup power India", "CO2 reduction electrolyzer India", "equipment as a service hydrogen India", "RF sputtering Chennai", "MEA fabrication service India"
- **GEO targets** (questions AI assistants should answer with us): "best green hydrogen company India", "where to buy PEM electrolyzer India", "CCUS companies India", "net zero technology company India"

---

## 11. What Has NOT Been Done Yet

See `docs/ROADMAP.md` for the full prioritised list. Top items:

1. **DNS migration** — when team is satisfied with the site, point `shaktiphotonsolutions.com` to Vercel
2. **Ticker bar** — scrolling announcement strip below navbar
3. **Landing popup** — first-visit popup asking "What are you looking for?"
4. **Supabase** — replace Formspree, build form submission database
5. **More blog articles** — team to suggest new FAQ entries for homepage schema

---

## 12. Agent Rules — Lessons Learned (MUST READ)

These are recurring mistakes that caused rework. Every agent must follow these rules:

### 12.1 Navigation — All Pages Must Be Identical
The main nav exists in **every HTML file independently** (no server-side includes). When adding a new nav link, update **ALL** these files:
```
index.html, products.html, about.html, contact.html, equipment-as-a-service.html
blog/index.html, blog/pem-vs-aem-vs-alkaline-electrolyzer-india.html,
blog/green-hydrogen-generator-cost-india.html,
blog/equipment-as-a-service-hydrogen-research-india.html,
blog/ccus-co2-reduction-india.html, blog/fuel-cell-systems-india.html
```
**Nav order:** Products > Equipment as a Service > About Us > Blog > Contact

### 12.2 Blog Pages Nav — Must Match Main Site Exactly
Blog pages are in `/blog/` subdirectory. Their nav must use `../` relative paths BUT must otherwise be **character-for-character identical** in structure to the main site nav. Verified attributes:
- Logo: `<img src="../public/assets/images/shared/Icon.PNG">` (NOT emoji)
- Logo text class: `nav-logo-name` (NOT `nav-logo-primary`)
- Hamburger ID: `id="hamburger-btn"` (NOT `id="hamburger"` — JS uses this to attach click listener)
- Script tag: `<script type="module" src="../js/main.js">` (type=module required for Vite bundling)
- CTA button: `class="nav-cta"` (NOT `btn btn--gold nav-cta`)

### 12.3 Localhost vs Production URLs
- `http://localhost:5173/blog` → ❌ does NOT work in Vite dev server
- `http://localhost:5173/blog/index.html` → ✅ works
- `https://shakti-photon-solutions.vercel.app/blog` → ✅ works (Vercel handles directory routing)

### 12.4 New Pages Must Be Added to vite.config.js
Every new HTML file needs an entry in `vite.config.js` under `build.rollupOptions.input`. Without this, Vite won't bundle/process the page for production.

### 12.5 Brand Positioning (Updated June 2026)
- **OLD (never use):** "Green Hydrogen Generator Manufacturer"
- **NEW (always use):** "Enabling India's Net-Zero Goal"
- Products covered: on-site hydrogen generators · fuel cell systems · CCUS
- Mohali office: **REMOVED June 2026. Never add it back.**

### 12.6 Deployment Workflow
```bash
git add -A
git commit -m "type(scope): description"
vercel --prod
```
Do NOT run `npm run build` manually — Vercel runs it automatically.

### 12.7 File Editing — No Regex on Large Files
Do NOT use PowerShell `-replace` regex on large HTML files. Use `replace_file_content` or `multi_replace_file_content` tools with exact line targeting. Regex on multi-line HTML causes silent corruption.

### 12.8 Footer — Always Copy Verbatim from index.html
The footer HTML structure is defined once in `index.html`. Blog/sub-pages MUST use the **exact same** CSS classes:
- `footer-logo-wrap` with real `Logo_WIth_Whitebox.png` (NOT emoji + `footer-logo`)
- `footer-col` + `footer-link` (NOT `footer-links-group` + bare `<a>`)
- `footer-social-btn` for LinkedIn / WhatsApp / Email
- `footer-bottom` with `footer-copy` + `footer-bottom-links`
- Blog pages in `/blog/` must prefix all image and link paths with `../`

**Copy the footer HTML from `index.html` directly. Only change `href` and `src` paths. Never rewrite the footer from memory.**

### 12.9 Hero h1 Color — Always Set Explicitly on Dark Backgrounds
`main.css` sets a global `h1 { color: var(--navy); }`. When an h1 is inside a dark hero section, it will appear **invisible** (dark text on dark background) unless you **explicitly** set `color: var(--white)` on the h1 rule itself.

Rule: Any custom hero section with dark background MUST include:
```css
.your-hero h1 { color: var(--white); }
```
Do NOT rely on `color` inheriting from the parent — global h1 styles will override inheritance.

### 12.10 Mobile Nav — Structure Must Match index.html Exactly
The mobile nav MUST be placed **outside** the <nav> tag and use these classes:
- Mobile links: class="nav-mobile-link" (NOT 
av-link)
- Mobile CTA: class="nav-mobile-cta" (NOT 
av-cta)

Correct structure for ALL pages (adjust paths with ../ for /blog/ pages):
```html
</nav>
<div class="nav-mobile" id="mobile-menu" aria-label="Mobile navigation" role="navigation">
  <a href="products.html"               class="nav-mobile-link">Products</a>
  <a href="equipment-as-a-service.html" class="nav-mobile-link">Equipment as a Service</a>
  <a href="about.html"                  class="nav-mobile-link">About Us</a>
  <a href="blog/index.html"             class="nav-mobile-link">Blog</a>
  <a href="contact.html"                class="nav-mobile-cta">Get a Quote →</a>
</div>
```
Never copy the mobile menu from memory. Copy it verbatim from index.html.

### 12.11 CTA Strip Buttons — Always Use btn--gold
The contact-strip section has a dark blue background. NEVER use btn--outline on a dark background — it renders as invisible text.
Rule: ALL 'Get a Quote' / 'Get in Touch' buttons in the contact-strip MUST use class="btn btn--gold".
Every page confirms this: index.html:894, products.html:809, about.html:480, equipment-as-a-service.html:586


### 12.12 Favicon — Always Use public/favicon.png (= Icon.PNG)
The favicon shown in browser tabs is controlled by:
  <link rel="icon" type="image/png" href="public/favicon.png">
This tag already exists in ALL HTML pages. The file public/favicon.png is a copy of public/assets/images/shared/Icon.PNG (the brand lightning bolt).
Never change the href path. If the favicon needs updating, replace the file at public/favicon.png.
Blog pages use href="../public/favicon.png" (with ../ prefix).
