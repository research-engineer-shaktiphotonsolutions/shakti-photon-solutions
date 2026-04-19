-- Fix function search_path warnings
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.build_media_storage_path(
  p_page_slug TEXT,
  p_subsection_slug TEXT,
  p_asset_name TEXT,
  p_file_ext TEXT
)
RETURNS TEXT
LANGUAGE SQL
IMMUTABLE
SET search_path = public
AS $$
  SELECT lower(trim(p_page_slug))
    || '/'
    || lower(trim(p_subsection_slug))
    || '/'
    || lower(regexp_replace(trim(p_asset_name), '\\s+', '-', 'g'))
    || '.'
    || lower(trim(p_file_ext));
$$;

-- Replace permissive anon allowlist read with a security-definer check function
DROP POLICY IF EXISTS "Anon can check allowlist" ON public.admin_allowed_emails;

CREATE OR REPLACE FUNCTION public.is_email_allowed(p_email TEXT)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_allowed_emails
    WHERE lower(email) = lower(trim(p_email))
  );
$$;

COMMENT ON FUNCTION public.is_email_allowed(TEXT) IS 'Public helper to check if an email is on the admin allowlist without exposing the full list.';

GRANT EXECUTE ON FUNCTION public.is_email_allowed(TEXT) TO anon, authenticated;