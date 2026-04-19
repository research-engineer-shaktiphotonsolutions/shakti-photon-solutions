## Goal

Make the admin panel a true CMS where every page's text + images are editable, persist to Supabase (not localStorage), and reorganize the database so each table's purpose is obvious in the Supabase Table Editor.

## Current Pain Points

1. **Admin only edits the Home page** (mission visual, event showcase, 3 customer images) + ticker. All other pages (Electrolyzers, Fuel Cells, R&D, Team, Customers, Contact, Solutions) have hardcoded headings, paragraphs, and image arrays inside `.tsx` files — not editable.
2. **Persistence is localStorage** (`sps-home-media-config-v1`). Edits live only in the editor's browser; visitors never see them.
3. **Database is confusing**: only `media_assets` (everything dumped under `subsection_slug = 'general'`) and `leads`. No table for page text, no table for ticker, no admin allowlist, no roles. Page slugs like `rd` vs route `/r-d-work-stations` don't match.
4. **No image library view** — admin can't browse/replace existing Supabase media, only paste a path.

## Proposed Solution

### A. Database redesign (clear, self-documenting tables)

New tables, all prefixed by purpose so the Table Editor groups them logically:

```text
cms_pages              → one row per page (slug, title, route, display_order, is_published)
cms_sections           → text blocks per page (page_id, section_key, heading, body, sort_order)
cms_media              → renamed/cleaned media_assets, properly subsectioned per real page
cms_settings           → site-wide key/value (ticker_text, popup_copy, contact info, SEO defaults)
admin_allowed_emails   → replaces hardcoded AUTHORIZED_EMAILS list
admin_audit_log        → who changed what, when (optional but useful)
leads                  → unchanged
```

Each table gets a SQL `COMMENT ON TABLE` so the Table Editor shows a description tooltip. Columns also get comments. Foreign keys link `cms_sections` and `cms_media` → `cms_pages` so the Editor renders the relationship.

**Subsection slugs fixed**: re-seed `cms_media` so home/hero, home/mission, electrolyzers/stacks, electrolyzers/bop, team/founders, team/core, etc. — replacing the current "general" dumping ground.

### B. Admin UI redesign (`/admin`)

Replace the single long page with a sidebar layout:

```text
┌─────────────────┬──────────────────────────────────┐
│  Admin Sidebar  │  Editor Panel                    │
│                 │                                  │
│  Dashboard      │  (Selected section's editor)     │
│  ─ Pages        │                                  │
│    Home         │  Live preview pane below         │
│    Electrolyzers│                                  │
│    Fuel Cells   │                                  │
│    R&D          │                                  │
│    Team         │                                  │
│    Customers    │                                  │
│    Contact      │                                  │
│  ─ Site         │                                  │
│    Ticker       │                                  │
│    Settings     │                                  │
│    SEO          │                                  │
│  ─ Leads        │                                  │
│  ─ Media Library│                                  │
│  ─ Admin Users  │                                  │
└─────────────────┴──────────────────────────────────┘
```

For each page: list its sections from `cms_sections`, edit heading/body inline, drag images from `cms_media` (or upload directly to the `site-media` bucket — uploads also create the `cms_media` row automatically).

**Media Library**: grid view of all assets in Supabase Storage with filter by page/subsection, replace/delete buttons.

**Admin Users**: add/remove emails in `admin_allowed_emails` instead of editing source code.

### C. Frontend reads from Supabase

Pages refactor: each page calls a `usePageContent(slug)` hook that fetches `cms_sections` + `cms_media` once and renders. Defaults to current hardcoded copy if Supabase is empty (graceful fallback). LocalStorage is dropped.

### D. Auth allowlist via DB

`AdminAuth.tsx` checks the signed-in email against `admin_allowed_emails` (RLS: only authenticated users in that table can read CMS write tables). New policy: `cms_*` tables — public SELECT, authenticated-allowlisted INSERT/UPDATE/DELETE via a `is_admin()` SECURITY DEFINER function.

## Implementation Phases (one at a time, your call after each)

1. **Phase 1 — DB foundation**: create `cms_pages`, `cms_sections`, `cms_settings`, `admin_allowed_emails`; rename/restructure `media_assets` → `cms_media` with proper subsections; add table/column comments; seed current content from existing `.tsx` files. Migrate `AdminAuth` allowlist to DB.
2. **Phase 2 — Admin UI shell**: sidebar layout, page picker, per-section editor, save to Supabase.
3. **Phase 3 — Wire pages to Supabase**: refactor HomePage first, verify, then roll out to remaining 7 pages.
4. **Phase 4 — Media Library + uploads**: drag-drop upload to `site-media`, auto-create `cms_media` rows, replace/delete UI.
5. **Phase 5 — Admin Users + audit log**: manage allowlist from UI; log changes.

## Questions before starting Phase 1

- For **rich text** (paragraphs with bold/links), do you want a simple textarea (markdown) or a WYSIWYG editor (e.g., TipTap)? Markdown is faster; WYSIWYG is friendlier for non-tech editors.
- Should the admin be able to **add/remove sections** on a page (structural changes), or only edit existing sections' text and images? Add/remove is more flexible but takes longer to build safely.
- Any pages you want to **exclude from CMS** (e.g., keep Contact form hardcoded)?

Once you answer these, I'll start with Phase 1 (DB migration + comments + seeding + DB-backed admin allowlist).

Answer: I want markdown editor.   
I want add/remove section both

yes exclude Contact