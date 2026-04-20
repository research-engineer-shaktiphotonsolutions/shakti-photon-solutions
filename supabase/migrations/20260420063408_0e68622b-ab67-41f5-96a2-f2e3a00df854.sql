INSERT INTO public.admin_allowed_emails (email, note) VALUES
  ('gs.engineer.rdshaktiphoton@gmail.com', 'Added via chat'),
  ('sahgyan9@gmail.com', 'Added via chat')
ON CONFLICT (email) DO NOTHING;