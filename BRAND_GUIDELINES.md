# BRAND GUIDELINES — Shakti Photon Solutions
**Version:** 2.0 (June 2026)
**Status:** 🟡 Working Draft — values verified against live website & brand explorer
**Interactive tool:** Open `brand-explorer.html` in a browser to preview changes live.

> **How to use this document**
> Any AI model, designer, or employee creating a website page, product catalog,
> presentation, or social media post must follow these guidelines exactly.
> Do NOT pick colours, fonts, or spacing by intuition — always use the values here.

---

## 1. Brand Identity

### 1.1 Company Name
- **Full legal name:** Shakti Photon Solutions Private Limited
- **Short name (website / catalog):** Shakti Photon Solutions
- **Never use:** "SPS", "ShaktiPhoton", "Shakti Photon Soln", or any abbreviation

### 1.2 Hero Messaging (Website)
The hero section on `index.html` uses this exact content:
- **Badge:** 🇮🇳 Made in India
- **Headline:** "Enabling India's **Net-Zero Goal**" (the word "Net-Zero Goal" is cyan)
- **Sub-headline:** "**On-site hydrogen generators** · **Fuel cell systems** · **Carbon Capture, Utilization and Storage**"
- **Trust badges:** 70+ Cumulative Years Global R&D · Incubated at IIT Madras · 9 Institutional Partners · CLIMAFIX 2024 Finalist

> ⚠️ The hero is **NOT** about "green hydrogen" specifically — the company has broadened to cover hydrogen generators, fuel cells, AND CCUS. Always reflect all three product lines in top-level messaging.

### 1.3 Tagline
> `[CONFIRM]` — Team to agree on one official tagline.
> Website footer currently uses: **"India's green hydrogen & net-zero technology company"**
> The hero does NOT have a standalone tagline — it uses the structured badge + headline above.

### 1.4 Brand Personality
The brand should feel:
- **Credible & scientific** — backed by IIT/IISc research, not a startup hustle brand
- **Accessible** — complex technology explained in plain language
- **Ambitious but grounded** — serious about India's hydrogen mission, not flashy
- **Trustworthy** — conservative enough for institutional B2B buyers

---

## 2. Logo

### 2.1 Logo Formats Available

| File | Format | Usage |
|------|--------|-------|
| `public/favicon.png` | 40×40 icon | **Primary use** — navbar and footer |
| `public/assets/images/Shakti-Photon-solns-1024x302_logo.png` | Full banner | Schema.org structured data, email signatures |
| `public/assets/images/Shakti_Photon_Solutions_Logo.avif` | Full banner (AVIF) | High-performance alternative |

### 2.2 Logo Pattern — Navbar & Footer (Primary)
The **primary logo treatment** across the site is the favicon + text lockup:

```
┌──────────────────────────────────────────┐
│ [favicon.png]  Shakti Photon Solutions   │
│   40×40        Private Limited           │
└──────────────────────────────────────────┘
```

**Implementation (from `nav.js` / `footer.js`):**
```html
<a href="/" class="nav-logo">
  <div class="nav-logo-icon">
    <img src="/favicon.png" alt="" width="40" height="40">
  </div>
  <div class="nav-logo-text">
    <span class="nav-logo-name">Shakti Photon Solutions</span>
    <span class="nav-logo-sub">Private Limited</span>
  </div>
</a>
```

**CSS:**
- Icon: `40×40px`, `border-radius: var(--r-sm)` (8px)
- Company name: `font-size: 0.9rem`, `font-weight: 700`, `color: var(--navy)` (white on dark bg)
- "Private Limited": `font-size: 0.6rem`, `color: var(--text-muted)` (50% white on dark bg)

### 2.3 Logo Usage Rules
| Context | Treatment |
|---------|-----------|
| **Navbar** (white frosted glass bg) | Favicon + navy text |
| **Footer** (dark bg) | Favicon + white text |
| **Full banner logo** | Only for structured data / email signatures |
| Minimum size | `[CONFIRM]` — Suggest: favicon min 32px, text min 12px |
| Clear space | Equal to the height of the favicon icon on all sides |

### 2.4 Logo Don'ts
- ❌ Do NOT use the full banner logo in the navbar or footer
- ❌ Do NOT stretch or distort the favicon
- ❌ Do NOT change logo colours
- ❌ Do NOT place logo on a busy background without contrast overlay
- ❌ Do NOT recreate the logo in text — always use favicon.png for the icon

---

## 3. Colour Palette

> All colours below are verified from the live website (`css/main.css`) and
> documented in the interactive Brand Explorer tool.

### 3.1 Primary Brand Colours

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Navy** (primary) | `#1B2D6E` | `--navy` | Headings, nav text, primary buttons, card titles |
| **Navy Dark** | `#0F1E4F` | `--navy-dark` | Hover states, dark section backgrounds, stats section gradient |
| **Navy Light** | `#243A8A` | `--navy-light` | Subtle navy variants |
| **Royal Blue** | `#2D4DE0` | `--royal` | Accent links, highlights |

> ⚠️ `[CONFIRM]` **Catalog discrepancy:** The catalog uses `--navy: #0d121a` (near-black) instead of the website's `#1B2D6E`. Team must align — recommend using `#1B2D6E` everywhere.

### 3.2 Accent Colours

| Name | Hex | CSS Variable | When to Use |
|------|-----|-------------|-------------|
| **Cyan** | `#00B4D8` | `--cyan` | Section tags, feature highlights, hero badge, gradient accents. Says "**look here**" |
| **Cyan Light** | `#E0F9FF` | `--cyan-light` | Tag backgrounds, soft highlights |
| **Gold** | `#F59E0B` | `--gold` | CTA buttons, stat numbers, trust badge stars. Says "**do this**" |
| **Gold Hover** | `#D97706` | `--gold-hover` | Gold button hover state |
| **Gold Light** | `#FEF3C7` | `--gold-light` | Gold tag backgrounds |

> **Rule: Never swap Cyan and Gold roles.** Cyan = informational. Gold = action. Gold tags would look like ads; cyan buttons wouldn't drive action.

### 3.3 Neutral Colours

| Name | Hex | CSS Variable | Usage |
|------|-----|-------------|-------|
| **Dark** | `#0F172A` | `--dark` | Footer background, dark section backgrounds |
| **Page Background** | `#F8FAFC` | `--bg` | Default page background |
| **Alt Background** | `#F1F5F9` | `--bg-alt` | Alternating section background |
| **White** | `#FFFFFF` | `--white` | Cards, overlays, nav background |
| **Body Text** | `#1E293B` | `--text` | All paragraph and label text |
| **Muted Text** | `#64748B` | `--text-muted` | Secondary text, captions, placeholders |
| **Border** | `#E2E8F0` | `--border` | Card borders, dividers, input borders |

### 3.4 Colour Accessibility (WCAG AA)
| Combination | Ratio | Status |
|-------------|-------|--------|
| Navy `#1B2D6E` on White `#FFFFFF` | 9.1:1 | ✅ AA Pass |
| Gold `#F59E0B` on Navy `#1B2D6E` | 5.2:1 | ✅ AA Pass |
| Body Text `#1E293B` on Background `#F8FAFC` | 12.8:1 | ✅ AA Pass |
| Muted `#64748B` on White `#FFFFFF` | 4.6:1 | ✅ AA Pass (borderline) |
| White `#FFFFFF` on Navy `#1B2D6E` | 9.1:1 | ✅ AA Pass |

> Use the **Palette view** in brand-explorer.html to check contrast ratios for any new combinations.

---

## 4. Typography

### 4.1 Primary Typeface
| Property | Value |
|----------|-------|
| **Font family** | Inter |
| **Source** | Google Fonts: `Inter:wght@300;400;500;600;700;800;900` |
| **Fallback stack** | `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` |
| **Why Inter?** | Neutral, highly legible, designed for screens, free |

> `[CONFIRM]` — Use the **Type tab** in brand-explorer.html to preview alternatives (Plus Jakarta Sans, DM Sans, Sora, Outfit). Any change requires updating both `main.css` AND `catalog.css`.

### 4.2 Type Scale (Website)

| Element | Size | Weight | CSS | Notes |
|---------|------|--------|-----|-------|
| **H1 / Hero** | `clamp(2.1rem, 5.5vw, 3.9rem)` | 900 | `.hero h1` | Letter spacing: `-0.02em`, line-height: `1.12` |
| **H2 / Section** | `clamp(1.6rem, 3.5vw, 2.5rem)` | 700 | `.section-header h2` | |
| **H3 / Card** | `1.15rem` | 700 | `.product-card h3` | Line-height: `1.3` |
| **Body** | `1rem` (16px) | 400 | `p` | Line height: `1.75` |
| **Muted body** | `1rem` | 400 | — | Uses `color: var(--text-muted)` |
| **Section tag** | `0.72rem` | 700 | `.section-tag` | UPPERCASE, letter-spacing: `0.1em` |
| **Button text** | `0.925rem` | 600 | `.btn` | |
| **Trust badge** | `0.78rem` | 500 | `.trust-badge` | |
| **Nav link** | `0.875rem` | 600 | `.nav-link` | |

> **Key principle:** `clamp()` makes fonts responsive. H1 shrinks on mobile (2.1rem) and grows on desktop (3.9rem), never exceeding the maximum. The ratio between sizes should feel like a natural progression.

### 4.3 Type Scale (Print Catalog — A4)

| Element | Size | Weight |
|---------|------|--------|
| Cover H1 | `3.2rem` (51px) | 800 |
| Section Heading | `1.55rem` (25px) | 800 |
| Body / Description | `0.82rem` (13px) | 400 |
| Spec Label | `0.6rem` (10px) | 700 (uppercase) |
| Spec Value | `0.9rem` (14px) | 700 |
| Caption | `0.65–0.72rem` | 400–600 |

### 4.4 Typography Rules
- ❌ Do NOT use font weights below 400 for body text
- ❌ Do NOT mix typefaces — use only Inter unless confirmed otherwise
- ✅ Section tags/labels are always: **uppercase, letter-spacing 0.1em, font-weight 700, small size**
- ✅ Headings on navy/dark backgrounds must be `#FFFFFF` (white)
- ✅ The `<em>` tag in hero h1 means "cyan accent text", NOT italic — always set `font-style: normal; color: var(--cyan);`

---

## 5. Spacing & Layout

### 5.1 Grid
- **Max content width:** `1240px` (`--container`)
- **Page padding (sides):** `24px`
- **Section vertical padding:** `96px 0`
- **Nav height:** `72px` (`--nav-h`)

### 5.2 Border Radius Scale
| Token | Value | Usage | Personality |
|-------|-------|-------|-------------|
| `--r-xs` | `4px` | Tiny elements, inline chips | |
| `--r-sm` | `8px` | Cards, input fields, favicon icon, buttons | |
| `--r-md` | `16px` | Standard cards | Your current default |
| `--r-lg` | `24px` | Large cards, modals | |
| `--r-xl` | `32px` | Hero elements | |
| `--r-full` | `9999px` | Pills, section tags, trust badges | |

> **Personality guide:** 0–4px = corporate/enterprise. 8–16px = modern/balanced (your brand). 24–32px = friendly/consumer. Use the **Shape tab** in brand-explorer.html to preview changes.

### 5.3 Shadows (Navy-Tinted)
| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(27,45,110,0.08)` | Subtle card lift |
| `--shadow-md` | `0 4px 24px rgba(27,45,110,0.1)` | Cards at rest |
| `--shadow-lg` | `0 20px 60px rgba(27,45,110,0.14)` | Card hover, featured sections |
| `--shadow-xl` | `0 40px 100px rgba(27,45,110,0.2)` | Hero/modal backdrop |

> **Why navy-tinted?** Shadows use `rgba(27,45,110,…)` instead of black. This tints shadows with your brand colour, making everything feel cohesive. Black shadows look generic. Navy shadows feel premium.

---

## 6. Navigation

### 6.1 Navbar (White Frosted Glass)
```css
.nav {
  background: rgba(255, 255, 255, 0.95);   /* mostly white, 5% transparent */
  backdrop-filter: blur(20px);              /* frosted glass effect */
  border-bottom: 1px solid var(--border);   /* subtle divider */
  height: var(--nav-h);                     /* 72px */
  position: fixed;                          /* stays at top on scroll */
}
```

> ⚠️ The navbar is **WHITE**, not navy. All text inside (logo name, nav links) uses dark/navy colours. On scroll, it gets a subtle shadow: `box-shadow: 0 4px 24px rgba(0,0,0,0.06)`.

### 6.2 Nav Links
| State | Style |
|-------|-------|
| Default | `color: var(--text)`, `font-weight: 600`, `font-size: 0.875rem` |
| Hover / Active | `color: var(--navy)`, `background: rgba(27,45,110,0.06)` |

### 6.3 Navigation Items (Single source: `public/js/nav.js`)
Home · Products · Equipment as a Service · About Us · Blog · Contact

---

## 7. UI Components

### 7.1 Button System
All buttons share this formula:
```css
.btn {
  padding: 13px 26px;
  border-radius: var(--r-sm);    /* 8px */
  font-size: 0.925rem;
  font-weight: 600;
  border: 2px solid transparent;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
/* Hover: lift 2px + glow */
.btn:hover { transform: translateY(-2px); }
```

| Variant | Background | Text | Border | Hover Glow |
|---------|-----------|------|--------|-----------|
| **Gold (CTA)** | `#F59E0B` | `#1a1000` | `#F59E0B` | `rgba(245,158,11,0.38)` |
| **Navy (Primary)** | `#1B2D6E` | White | `#1B2D6E` | `rgba(27,45,110,0.3)` |
| **WhatsApp** | `#25D366` | White | `#25D366` | `rgba(37,211,102,0.35)` |
| **Outline Navy** | Transparent | `#1B2D6E` | `#1B2D6E` | — (fills solid on hover) |
| **Outline White** | Transparent | White | `rgba(255,255,255,0.45)` | — (fills 10% white) |

**Arrow animation:** Buttons with `→` arrows animate the arrow 4px right on hover.
**WhatsApp icon:** Use the official WhatsApp SVG path, NOT a speech bubble emoji.

### 7.2 Section Tag / Pill
```css
.section-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--cyan);
  background: rgba(0,180,216,0.1);
  padding: 5px 14px;
  border-radius: 9999px;
  border: 1px solid rgba(0,180,216,0.2);
}
```
On dark backgrounds, use `section-tag--white` variant.

### 7.3 Cards
- Background: White `#FFFFFF`
- Border: `1px solid #E2E8F0`
- Border radius: `16px` (`--r-md`)
- Shadow at rest: `--shadow-md`
- **Hover:** `transform: translateY(-6px)` + shadow grows to `--shadow-lg`
- Staggered fade-in on scroll (0.08s increments)

### 7.4 Trust Badges (Hero)
```css
.trust-badge {
  background: rgba(255,255,255,0.08);     /* glassmorphism */
  border: 1px solid rgba(255,255,255,0.12);
  backdrop-filter: blur(8px);
  border-radius: 9999px;
  font-size: 0.78rem;
  font-weight: 500;
}
.trust-badge .ti { color: var(--gold); }  /* gold star icon */
```

---

## 8. Micro-Animations

### 8.1 Animation Principles
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` — fast start, soft landing (material design standard)
- **Duration:** `0.3s` for hover states, `0.72s` for scroll reveals
- **Direction:** Elements move UP (translateY negative) on hover
- **Frequency:** Animate once on scroll (IntersectionObserver), continuously on hover

### 8.2 Animation Patterns Used

| Pattern | CSS | Where Used |
|---------|-----|-----------|
| **Lift** | `transform: translateY(-2px to -6px)` | Buttons, cards |
| **Glow** | `box-shadow: 0 8px 24px rgba(brand, 0.35)` | Gold/cyan/whatsapp buttons |
| **Arrow slide** | `.btn-arrow { transform: translateX(4px) }` | All CTA buttons |
| **Scale** | `transform: scale(1.08)` | Partner logos on hover |
| **Scroll reveal** | `opacity:0 → 1, translateY(28px) → 0` | Cards, sections (one-time) |
| **Ken Burns** | `transform: scale(1.06) → scale(1)` on load | Hero background image |
| **Scroll pulse** | Infinite subtle bounce at hero bottom | "Scroll" hint text |
| **Stagger delay** | `0.08s` increment per child | Card grid reveal |

### 8.3 Scroll Reveal System
```css
.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.72s cubic-bezier(0.22, 0.61, 0.36, 1),
              transform 0.72s cubic-bezier(0.22, 0.61, 0.36, 1);
}
.reveal.revealed { opacity: 1; transform: translateY(0); }

.reveal-delay-1 { transition-delay: 0.08s; }
.reveal-delay-2 { transition-delay: 0.16s; }
/* ... up to delay-6 */
```
**JS:** Uses `IntersectionObserver` — animates only once when element enters viewport. No scroll jank.

---

## 9. Iconography & Imagery

### 9.1 Icons
- **Social icons:** Use inline SVGs for brand icons (WhatsApp, LinkedIn)
- **Functional emoji:** 🇮🇳 (Made in India badge), ★ (trust badge stars)
- `[CONFIRM]` — No formal icon set yet. Recommend adopting **Phosphor Icons** or **Heroicons** as standard.

### 9.2 Photography Style
- **Subject:** Real lab equipment, real team, real installations (no stock photos)
- **Tone:** Clean, technical, well-lit
- **Hero image:** Green Hydrogen Summit 2025 — team presenting to CM of AP
- **Avoid:** Blurry, low-contrast, overly posed images

### 9.3 Technical Diagrams
- Use `object-fit: contain` with white background padding
- Don't crop technical diagrams — legibility over aesthetics

---

## 10. Voice & Tone

### 10.1 Writing Principles
| Principle | Do | Don't |
|-----------|-----|-------|
| **Plain language** | "Our electrolyzers split water using electricity" | "Our advanced electrolytic systems leverage Faradaic processes..." |
| **Credibility first** | Cite institutions, show real specs | Make vague claims ("world-class", "cutting edge") |
| **India-specific** | Reference Indian regulations, MNRE, Indian universities | Copy Western messaging about subsidies/grants that don't apply |
| **B2B professional** | "Our scientists respond within 24 hours" | Casual/slang language |
| **Three product lines** | Always mention H₂ generators + fuel cells + CCUS | Focus only on "green hydrogen" |

### 10.2 Units & Formatting
- Energy: use **kW** (kilowatt), **kWh** (kilowatt-hour)
- Hydrogen: use **kg/day** for production rate
- Always write **₹** for Indian Rupees, not "Rs" or "INR" in body text
- Separate thousands with commas: **1,000** not **1000**
- Hydrogen purity: **99.999%** (not "5N" — too technical for website)

---

## 11. Contact Details (Canonical)

> Always use these exact values — sourced from `footer.js` and structured data.

| Field | Value |
|-------|-------|
| **Phone** | +91 73820 25117 |
| **Email** | info@shaktiphotonsolutions.com |
| **Website** | https://www.shaktiphotonsolutions.com |
| **Chennai (HQ)** | IIT Madras Research Park, Chennai, Tamil Nadu — 600 113 |
| **Amaravati** | JC Bose Block, SRM AP University, Amaravati, Andhra Pradesh — 522 502 |
| **LinkedIn** | https://www.linkedin.com/company/shakti-photon-solutions-private-limited/ |
| **WhatsApp** | https://wa.me/917382025117 |
| **GST** | 37ABKCS1534R1ZN |
| **PAN** | ABKCS1534R |

---

## 12. What Each AI Session Must Check

When any AI model works on website pages, catalog, or presentations:

1. ✅ Import Inter from Google Fonts — never use system fonts
2. ✅ Use `--navy: #1B2D6E` as the primary dark colour (NOT `#0d121a`)
3. ✅ Use `--gold: #F59E0B` for all primary CTA buttons
4. ✅ Use `--cyan: #00B4D8` for section tags and highlights
5. ✅ Body text: `#1E293B`, muted text: `#64748B`
6. ✅ Shadows tinted with navy `rgba(27,45,110,…)`, not black
7. ✅ Section labels: uppercase, letter-spacing 0.1em, 700 weight, small size
8. ✅ Navbar is **white frosted glass** — NOT navy
9. ✅ Logo = favicon.png (40×40) + text lockup — NOT the full banner image
10. ✅ WhatsApp button uses SVG icon, NOT emoji
11. ✅ Hero headline = "Enabling India's Net-Zero Goal" — covers H₂, fuel cells, AND CCUS
12. ❌ Never use RF Sputtering as a service — it's removed
13. ❌ Never mention Mohali or Guntur — only Chennai and Amaravati
14. ❌ Never abbreviate the company name

---

## 13. Open Decisions (Team Must Confirm)

| # | Decision | Options |
|---|----------|---------|
| 1 | Official tagline | "India's green hydrogen & net-zero technology company" vs custom |
| 2 | Catalog navy colour | Match website `#1B2D6E` (recommended) or keep `#0d121a` |
| 3 | Catalog gold colour | Match website `#F59E0B` (recommended) or keep `#FFB703` |
| 4 | Display/heading font | Keep Inter-only or add a display font for catalog covers |
| 5 | Icon set | Phosphor Icons, Heroicons, or keep inline SVG |

---

*Last updated: 17 June 2026 | Maintained by: Research Engineer*
*Interactive tool: `brand-explorer.html` — v2.0*
*Next review: `[CONFIRM]` — Set a quarterly review date*
