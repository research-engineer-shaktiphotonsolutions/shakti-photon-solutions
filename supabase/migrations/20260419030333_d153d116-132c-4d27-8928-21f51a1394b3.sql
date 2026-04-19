-- =========================================================================
-- PHASE 1: CMS FOUNDATION
-- =========================================================================

-- 1. Rename media_assets -> cms_media so all CMS tables group together
ALTER TABLE IF EXISTS public.media_assets RENAME TO cms_media;
ALTER INDEX IF EXISTS media_assets_page_subsection_idx RENAME TO cms_media_page_subsection_idx;
ALTER INDEX IF EXISTS media_assets_kind_idx RENAME TO cms_media_kind_idx;
ALTER INDEX IF EXISTS media_assets_active_idx RENAME TO cms_media_active_idx;

-- 2. cms_pages
CREATE TABLE IF NOT EXISTS public.cms_pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  route TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_published BOOLEAN NOT NULL DEFAULT true,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.cms_pages IS 'CMS — one row per editable site page (Home, Electrolyzers, etc.). Drives the admin sidebar.';
COMMENT ON COLUMN public.cms_pages.slug IS 'Stable identifier used by the frontend (e.g. home, electrolyzers, fuel-cells).';
COMMENT ON COLUMN public.cms_pages.route IS 'URL path on the public site (e.g. /, /electrolyzers).';
COMMENT ON COLUMN public.cms_pages.display_order IS 'Order in the admin sidebar.';

-- 3. cms_sections
CREATE TABLE IF NOT EXISTS public.cms_sections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID NOT NULL REFERENCES public.cms_pages(id) ON DELETE CASCADE,
  section_key TEXT NOT NULL,
  heading TEXT,
  body_markdown TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (page_id, section_key)
);

CREATE INDEX IF NOT EXISTS cms_sections_page_sort_idx ON public.cms_sections (page_id, sort_order);

COMMENT ON TABLE public.cms_sections IS 'CMS — text blocks belonging to a page (hero, mission, etc.). Body is markdown.';
COMMENT ON COLUMN public.cms_sections.section_key IS 'Stable key the frontend uses to find this block (e.g. hero, mission, cta).';
COMMENT ON COLUMN public.cms_sections.body_markdown IS 'Body content in Markdown.';

-- 4. cms_settings
CREATE TABLE IF NOT EXISTS public.cms_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}'::jsonb,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.cms_settings IS 'CMS — site-wide key/value settings (ticker text, popup copy, contact info, SEO defaults).';
COMMENT ON COLUMN public.cms_settings.key IS 'Stable identifier (e.g. marketing_ticker, popup_copy).';
COMMENT ON COLUMN public.cms_settings.value IS 'JSON value. Use {"text": "..."} for simple strings.';

-- 5. cms_media — extend existing table with link to cms_pages (nullable for back-compat)
ALTER TABLE public.cms_media
  ADD COLUMN IF NOT EXISTS page_id UUID REFERENCES public.cms_pages(id) ON DELETE SET NULL;

COMMENT ON TABLE public.cms_media IS 'CMS — media assets (images, videos, gifs). Linked to a page via page_id and grouped by subsection_slug.';
COMMENT ON COLUMN public.cms_media.page_slug IS 'Page slug (matches cms_pages.slug). Kept for back-compat.';
COMMENT ON COLUMN public.cms_media.subsection_slug IS 'Section grouping inside the page (e.g. hero, mission, gallery).';
COMMENT ON COLUMN public.cms_media.asset_name IS 'Stable name of the asset within the section.';
COMMENT ON COLUMN public.cms_media.storage_path IS 'Path inside the storage_bucket. Use build_media_storage_path() to compute.';

-- 6. admin_allowed_emails
CREATE TABLE IF NOT EXISTS public.admin_allowed_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  note TEXT,
  added_by TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMENT ON TABLE public.admin_allowed_emails IS 'AUTH — allowlist of email addresses permitted to sign in to /admin. Replaces the hardcoded list in code.';
COMMENT ON COLUMN public.admin_allowed_emails.email IS 'Lowercased email address (must match Supabase auth.users.email).';

-- 7. admin_audit_log
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  actor_email TEXT,
  action TEXT NOT NULL,
  entity_type TEXT,
  entity_id TEXT,
  diff JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS admin_audit_log_created_idx ON public.admin_audit_log (created_at DESC);

COMMENT ON TABLE public.admin_audit_log IS 'AUDIT — record of admin actions (who edited what, when).';

-- 8. is_admin() security definer helper
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.admin_allowed_emails a
    JOIN auth.users u ON lower(u.email) = lower(a.email)
    WHERE u.id = auth.uid()
  );
$$;

COMMENT ON FUNCTION public.is_admin() IS 'Returns true when the current authenticated user''s email is in admin_allowed_emails.';

-- 9. updated_at triggers
DROP TRIGGER IF EXISTS trg_cms_pages_updated_at ON public.cms_pages;
CREATE TRIGGER trg_cms_pages_updated_at BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_sections_updated_at ON public.cms_sections;
CREATE TRIGGER trg_cms_sections_updated_at BEFORE UPDATE ON public.cms_sections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_cms_settings_updated_at ON public.cms_settings;
CREATE TRIGGER trg_cms_settings_updated_at BEFORE UPDATE ON public.cms_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 10. Enable RLS
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_allowed_emails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_log ENABLE ROW LEVEL SECURITY;

-- 11. Policies — public read for content tables
DROP POLICY IF EXISTS "Public read pages" ON public.cms_pages;
CREATE POLICY "Public read pages" ON public.cms_pages FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admins manage pages" ON public.cms_pages;
CREATE POLICY "Admins manage pages" ON public.cms_pages FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read sections" ON public.cms_sections;
CREATE POLICY "Public read sections" ON public.cms_sections FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins manage sections" ON public.cms_sections;
CREATE POLICY "Admins manage sections" ON public.cms_sections FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

DROP POLICY IF EXISTS "Public read settings" ON public.cms_settings;
CREATE POLICY "Public read settings" ON public.cms_settings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins manage settings" ON public.cms_settings;
CREATE POLICY "Admins manage settings" ON public.cms_settings FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Tighten cms_media write policy to admin-only (read stays public)
DROP POLICY IF EXISTS "Authenticated manage media catalog" ON public.cms_media;
CREATE POLICY "Admins manage media" ON public.cms_media FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- admin_allowed_emails — admins only
DROP POLICY IF EXISTS "Admins read allowlist" ON public.admin_allowed_emails;
CREATE POLICY "Admins read allowlist" ON public.admin_allowed_emails FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins manage allowlist" ON public.admin_allowed_emails;
CREATE POLICY "Admins manage allowlist" ON public.admin_allowed_emails FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Allow anon SELECT of just the email column for sign-in allowlist check (needed before login)
DROP POLICY IF EXISTS "Anon can check allowlist" ON public.admin_allowed_emails;
CREATE POLICY "Anon can check allowlist" ON public.admin_allowed_emails FOR SELECT USING (true);

-- admin_audit_log — admins only
DROP POLICY IF EXISTS "Admins read audit log" ON public.admin_audit_log;
CREATE POLICY "Admins read audit log" ON public.admin_audit_log FOR SELECT TO authenticated
  USING (public.is_admin());

DROP POLICY IF EXISTS "Admins write audit log" ON public.admin_audit_log;
CREATE POLICY "Admins write audit log" ON public.admin_audit_log FOR INSERT TO authenticated
  WITH CHECK (public.is_admin());

-- 12. Seed pages
INSERT INTO public.cms_pages (slug, title, route, display_order) VALUES
  ('home',          'Home',             '/',                    1),
  ('electrolyzers', 'Electrolyzers',    '/electrolyzers',       2),
  ('fuel-cells',    'Fuel Cells',       '/fuel-cells',          3),
  ('rd',            'R&D Workstations', '/r-d-work-stations',   4),
  ('team',          'Team',             '/team',                5),
  ('customers',     'Customers',        '/customers',           6),
  ('solutions',     'Solutions',        '/solutions',           7)
ON CONFLICT (slug) DO NOTHING;

-- 13. Seed marketing ticker setting
INSERT INTO public.cms_settings (key, value, description) VALUES
  ('marketing_ticker',
   jsonb_build_object('text', 'Custom PEM, AEM and Alkaline Electrolyzers | On-Site Hydrogen Generation | CO2 to Fuel Innovation | R&D Platforms for Academia and Industry'),
   'Marketing highlight bar text shown above the site header.')
ON CONFLICT (key) DO NOTHING;

-- 14. Seed admin allowlist with current email
INSERT INTO public.admin_allowed_emails (email, note) VALUES
  ('shaktiphotonsolution@gmail.com', 'Initial admin (migrated from hardcoded list).')
ON CONFLICT (email) DO NOTHING;