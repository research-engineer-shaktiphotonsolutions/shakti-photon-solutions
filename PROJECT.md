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
| Home | `index.html` | `/` | Hero, product cards, stats, partners, enquiry CTA |
| Products | `products.html` | `/products` | Full product specs and EaaS details |
| Equipment as a Service | `equipment-as-a-service.html` | `/equipment-as-a-service` | Session booking for lab equipment |
| About | `about.html` | `/about` | Team bios, company timeline, research stats |
| Contact | `contact.html` | `/contact` | Contact form (Formspree), office info |

All pages are declared as entry points in `vite.config.js`. New HTML pages MUST be added there.

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

- `sitemap.xml` — all 5 pages listed
- `robots.txt` — allows all crawlers, references sitemap
- JSON-LD `Organization` schema on all pages
- Open Graph + Twitter Card meta tags on all pages
- Canonical URLs on all pages
- Semantic HTML structure (h1, h2, h3 hierarchy)

### Target Keywords
- **Primary:** "green hydrogen company India", "green hydrogen generator India", "PEM electrolyzer India", "fuel cell system India", "fuel cell India"
- **Secondary:** "CCUS India", "carbon capture company India", "carbon capture utilization and storage India", "net zero enabler India", "MEA manufacturer India", "MEA manufacturing India"
- **Long-tail:** "PEM electrolyzer manufacturer India", "alkaline electrolyzer India", "AEM electrolyzer India", "on-site hydrogen generator India", "hydrogen fuel cell backup power India", "CO2 reduction electrolyzer India", "equipment as a service hydrogen India", "RF sputtering Chennai", "MEA fabrication service India"
- **GEO targets** (questions AI assistants should answer with us): "best green hydrogen company India", "where to buy PEM electrolyzer India", "CCUS companies India", "net zero technology company India"

---

## 11. What Has NOT Been Done Yet

See `docs/ROADMAP.md` for the full prioritised list. Top items:

1. **GEO optimization** — FAQ schema, "People Also Ask" content, AI-readable structured answers
2. **Blog / articles** — 5 long-form SEO articles (user will write with AI drafting assistance)
3. **Ticker bar** — scrolling announcement strip below navbar
4. **Landing popup** — first-visit popup asking "What are you looking for?"
5. **DNS migration** — when team is satisfied with the site
6. **Supabase** — replace Formspree, build form submission database
