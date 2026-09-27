# Project Context Prompt — Shakti Photon Solutions Website

Before you propose or implement ANY change to this codebase, you MUST follow
this strict research protocol. Do NOT skip steps.

---

## STEP 1: Read project documentation FIRST (before any code)
Read these files in this order:
1. `CHANGELOG.md` — understand what has already been done and why
2. `DECISIONS.md` — understand architectural decisions and constraints
3. `Instruction.txt` or any `.md` in the root — understand project rules

Extract and remember:
- What features have been removed (do NOT re-introduce them)
- What office locations are valid (currently: Chennai, Amaravati only)
- What services are commented out (RF Sputtering is intentionally removed)
- What the current design patterns are

---

## STEP 2: Map ALL files in the project
Run a directory listing of the entire project. Identify:
- All `.html` files (root level AND subdirectories like `blog/`)
- All `.js` files in `js/` and `public/js/`
- All `.css` files

Do NOT assume you know all the files. List them first.

---

## STEP 3: For any UI/form feature — read EVERY html file + js/main.js
For features that touch user interaction (forms, CTAs, buttons, modals):
- Read EVERY `.html` file, not just the obvious one
- Read `js/main.js` fully — the site-wide enquiry modal is generated here
  via `eqCreateModal()`, not in any HTML file
- Read `public/js/footer.js` and `public/js/nav.js` for shared components
- Read ALL blog post HTML files under `blog/` — they have their own CTAs
  and WhatsApp links

The enquiry system has TWO parallel paths:
1. `contact.html` — static HTML form submitted to Formspree
2. `js/main.js` → `eqCreateModal()` — JS-generated modal triggered from
   product pages, EaaS page, and blog articles

Any form field or tracking change MUST be applied to BOTH paths.

---

## STEP 4: Find ALL WhatsApp links across the site
Search for `wa.me` across every file. WhatsApp links exist in:
- `index.html`
- `products.html`
- `equipment-as-a-service.html`
- `about.html`
- `blog/index.html`
- All 5 blog article HTML files
- `public/js/footer.js` (footer icon — this one is generic, skip)

Each WhatsApp link that has a `?text=` parameter must be updated with the
source context.

---

## STEP 5: Find ALL contact.html links and add `?ref=` tracking
Search for `contact.html` across every file. Every link to `contact.html`
must append `?ref=<source>` so the hidden `_ref_page` field can be
auto-populated. Use these ref values:
- From homepage → `?ref=homepage`
- From products page → `?ref=products`
- From EaaS page → `?ref=eaas`
- From about page → `?ref=about`
- From blog index → `?ref=blog`
- From a specific blog article → `?ref=blog_<slug>`

---

## STEP 6: Write a COMPLETE implementation plan BEFORE writing any code
Your plan must:
- List EVERY file you will change (not just the obvious ones)
- Explain WHAT exactly changes in each file
- Note any decisions (e.g. "Other option → shows conditional text input")
- Flag anything that requires user confirmation

Do NOT write any code until the plan is approved.

---

## STEP 7: After implementing, verify with git diff
After making changes, run:
```
git diff HEAD
```
And confirm that every file listed in the plan was actually changed correctly.

---

## KEY CONSTRAINTS (never violate these)
- RF Sputtering is intentionally removed — do NOT add it back anywhere
- Only two offices: Chennai and Amaravati (no Mohali, no Guntur)
- University lab equipment must NOT be advertised as commercial services
- The `heard_via` dropdown is REQUIRED — never make it optional
- "Other" option in `heard_via` must reveal a free-text input with `required`
- The modal (`eqCreateModal` in `js/main.js`) must always mirror the
  contact form fields — they must stay in sync

---

## After completing work
Update `CHANGELOG.md` with a new entry (newest-first) that:
- Has a date header: `## [DD Month YYYY] — Brief title`
- Has sections for each type of change
- Lists every file changed with what was done
- Notes anything intentionally NOT changed and why

