# COMPONENT_MAP.md — Codebase Navigation Guide
## Shakti Photon Solutions Website

> Use this file to find any component, section, or function without grepping.
> AI: Jump directly to the right file and line instead of exploring blindly.

---

## index.html — Homepage

| Section | Approx. Line | Class / ID | Notes |
|---|---|---|---|
| `<head>` — meta, SEO, JSON-LD | 1–75 | — | JSON-LD Organization schema at ~line 50 |
| Navigation (shared) | ~76 | `.nav`, `#main-nav` | Duplicated across all pages |
| Mobile menu | ~100 | `.nav-mobile`, `#mobile-menu` | |
| Hero section | ~110 | `.hero`, `#hero` | Full-screen image, badge, h1, CTA buttons |
| Hero trust badges | ~140 | `.hero-trust` | "IIT Madras incubated" etc. |
| **What We Build** section | ~155 | `.products-section`, `#products` | |
| — Electrolyzers card | ~165 | `article.product-card` | `button[data-product="electrolyzers"]` |
| — Fuel Cells card | ~195 | `article.product-card` | `button[data-product="fuelcells"]` |
| — CCUS card | ~220 | `article.product-card` | `button[data-product="ccus"]` |
| EPC Banner | ~248 | `.epc-banner` | `button[data-product="epc"]` |
| Stats / Why Choose Us | ~263 | `.stats-section`, `#why-us` | Animated counters, founder chips |
| Industries We Serve | ~310 | `.industries-section` | 4 industry cards |
| Equipment as a Service (teaser) | ~360 | `.eas-preview` | Links to equipment-as-a-service.html |
| Partners & Installations | ~415 | `.partners-section` | Logo grid + installation images |
| Recognition / Events | ~470 | `.recognition-section` | CLIMAFIX finalist, etc. |
| Contact Strip | ~510 | `.contact-strip` | Final CTA before footer |
| Footer (shared) | ~535 | `.footer` | Duplicated across all pages |

---

## products.html — Products Page

| Section | Approx. Line | Class / ID | Notes |
|---|---|---|---|
| Hero | ~200 | `.products-hero` | Dark hero with title |
| PEM Electrolyzers | ~220 | `#electrolyzers` | Full spec table |
| Fuel Cell Systems | ~280 | `#fuelcells` | Full spec table |
| R&D Platforms | ~340 | `#rd-platforms` | Research workstations |
| CCUS / CO₂ Reduction | ~390 | `#ccus` | Electrochemical CO₂ reduction |
| EaaS teaser | ~450 | — | Brief mention, links to EaaS page |

---

## equipment-as-a-service.html — EaaS Page

| Section | Approx. Line | Class / ID | Notes |
|---|---|---|---|
| Hero | ~190 | `.eas-hero` | |
| How It Works (3 steps) | ~210 | `.eas-how-it-works` | Select → Book → Use |
| RF Sputtering card | ~240 | `.eas-card` | `[data-product="sputtering"]` button |
| Ultrasonic Spray card | ~280 | `.eas-card` | `[data-product="spray-nozzle"]` button |
| Hot Press card | ~320 | `.eas-card` | `[data-product="hot-press"]` button |
| 3D Printing card | ~360 | `.eas-card` | `[data-product="3d-printing"]` button |
| Support Services | ~410 | `.services-section` | 3 support tiles (training, 24/7 support, EPC) |

---

## about.html — About Page

| Section | Approx. Line | Class / ID | Notes |
|---|---|---|---|
| Hero | ~200 | `.about-hero` | |
| Mission & Vision | ~220 | `.mission-section` | |
| Research Stats | ~280 | `.research-stats` | 2 offices, partner institutions, etc. |
| Founders | ~320 | `.team-section` | Dr. Mallikarjuna + Dr. Sravani |
| Company Timeline | ~400 | `.timeline-section` | 2020 founding → 2024 CLIMAFIX |
| LinkedIn CTA | ~480 | — | Link to LinkedIn company page |

---

## contact.html — Contact Page

| Section | Approx. Line | Class / ID | Notes |
|---|---|---|---|
| Hero | ~215 | `.contact-hero` | |
| Contact info sidebar | ~227 | `.cinfo-card` | Phone, email, LinkedIn, support hours |
| Office list (sidebar) | ~262 | `.offices-list` | Chennai + Guntur addresses |
| WhatsApp CTA (sidebar) | ~277 | `.whatsapp-cta` | Opens WhatsApp with pre-written message |
| **Contact Form** | ~291 | `#contact-form` | Formspree ID `mnjypvga` |
| — Service dropdown | ~333 | `#service-select` | 12 options + "General Inquiry" |
| — Capacity field | ~351 | `#capacity` | Optional free-text |
| — Message textarea | ~355 | `#message` | Pre-filled by URL params |
| Form success state | ~375 | `#form-success` | Hidden until Formspree confirms OK |
| Offices strip | ~385 | `.offices-strip` | 2-column grid: Chennai + Guntur |

---

## css/main.css — Style Map

| Section | Approx. Line | Contents |
|---|---|---|
| CSS Custom Properties | 1–60 | All design tokens: colors, spacing, shadows |
| Reset / base | 60–90 | box-sizing, body, a, img defaults |
| Typography | 90–115 | h1–h4 sizes and weights |
| Buttons | 115–160 | `.btn`, `.btn--navy`, `.btn--gold`, `.btn--whatsapp` |
| Navigation | 227–390 | `.nav`, `.nav-mobile`, hamburger |
| Hero | 389–530 | `.hero`, `.hero-content`, `.hero-badge`, trust badges |
| Product cards | 531–645 | `.products-grid`, `.product-card`, `.product-card-link` |
| EPC Banner | 625–640 | `.epc-banner` |
| Stats section | 642–720 | `.stats-section`, `.stat-item`, founders strip |
| Industries | 723–762 | `.industries-grid`, `.industry-card` |
| EaaS cards | 763–870 | `.eas-grid`, `.eas-card`, `.eas-how-it-works` |
| Support services | 876–910 | `.services-section`, `.service-tile` |
| Partners | 911–972 | `.partners-logos`, `.partner-logo`, `.install-card` |
| Recognition | 974–1060 | `.recognition-grid`, `.recognition-card` |
| About page | 1060–1120 | `.team-grid`, `.timeline-section` |
| Footer | 1100–1200 | `.footer`, `.footer-grid`, `.footer-bottom` |
| Utility / animations | 1200–1430 | `.reveal`, `@keyframes`, responsive breakpoints |
| **Enquiry Modal** | **1438+** | `.eq-overlay`, `.eq-modal`, `.eq-form`, `.eq-success`, `.eq-confetti-canvas` |

---

## js/main.js — Function Map

| Section # | Approx. Line | Function / Purpose |
|---|---|---|
| 1 | ~1 | Module start, DOMContentLoaded wrapper |
| 2 | ~20 | `animateCounter()` — counts up numbers in stats |
| 3 | ~50 | IntersectionObserver — adds `.visible` class for scroll reveals |
| 4 | ~80 | Sticky nav + hamburger menu toggle |
| 5 | ~120 | Contact page form submit handler (`#contact-form`) |
| 6 | ~145 | Hero parallax on scroll |
| 7 | ~155 | Stats counter trigger (fires when `#why-us` is visible) |
| 8 | ~170 | URL query pre-fill (`?product=` / `?service=` → contact.html form) |
| 9 | ~242 | Partner logo staggered transition delays |
| 10 | ~248 | Active nav link highlight on scroll |
| 11 | ~270 | `eqProductData` — product data map for modal |
| 12 | ~320 | `eqCreateModal()` — builds and injects modal HTML once |
| 13 | ~400 | `eqGetOverlay()` — lazy getter |
| 14 | ~405 | `eqOpen(key)` — opens modal with product-specific data |
| 15 | ~430 | `eqClose()` — closes modal, stops confetti |
| 16 | ~437 | `eqFireConfetti()` — canvas confetti burst (160 particles) |
| 17 | ~490 | Form submit handler for `#eq-form` → Formspree async |
| 18 | ~520 | Click delegation — `[data-product]` buttons + close handlers |
| 19 | ~535 | Escape key listener for modal |

---

## public/ — Static Assets

```
public/
├── assets/
│   ├── images/
│   │   ├── home/           ← Hero image, installation photos
│   │   ├── products/       ← Product photography (electrolyzers, fuel cells)
│   │   ├── eas/            ← Equipment photos (3D printer, spray nozzle, hot press)
│   │   └── shared/         ← Logo (Icon.PNG, Logo_WIth_Whitebox.png), favicon
│   └── partners/           ← Institution logos (IIT, NIT, RV College, etc.)
└── favicon.png
```

---

## Config Files

| File | Purpose |
|---|---|
| `vite.config.js` | Declares all 5 HTML entry points — ADD NEW PAGES HERE |
| `vercel.json` | URL rewrites for clean routes (e.g., `/about` → `about.html`) |
| `robots.txt` | Allows all crawlers, references `/sitemap.xml` |
| `sitemap.xml` | Lists all 5 pages with `<lastmod>` dates |
| `package.json` | `npm run dev` (Vite), `npm run build` (production build) |
