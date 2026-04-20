-- Team members category enum
CREATE TYPE public.team_member_category AS ENUM ('founder', 'core', 'advisor');

-- Team members table
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  role text NOT NULL,
  bio text,
  photo_url text,
  category public.team_member_category NOT NULL DEFAULT 'core',
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Public can read active members
CREATE POLICY "Public read team members"
  ON public.team_members
  FOR SELECT
  USING (is_active = true);

-- Admins manage everything
CREATE POLICY "Admins manage team members"
  ON public.team_members
  FOR ALL
  TO authenticated
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- Auto-update updated_at
CREATE TRIGGER team_members_set_updated_at
  BEFORE UPDATE ON public.team_members
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Index for ordered queries by category
CREATE INDEX idx_team_members_category_order
  ON public.team_members (category, sort_order);

-- Seed current team data
INSERT INTO public.team_members (name, role, bio, photo_url, category, sort_order) VALUES
  ('Sravani Vulli', 'Managing Director & Founder', 'Ms. Sravani Vulli, the Managing Director and Founder, brings over 15 years of experience in electronics and IT. An alumnus of the esteemed National University of Singapore (NUS), she is responsible for overseeing key aspects of the business, including investment strategies, location selection for expansion, and team development. Her expertise and visionary leadership play a crucial role in driving the growth and operational excellence of the startup as it scales to new heights.', '/assets/images/team/founder-sravani.jpg', 'founder', 10),
  ('Mallikarjuna Rao M', 'Co-Founder', 'Dr. Malikarjun, a seasoned innovator with 16+ years of global R&D experience at NUS Singapore, Uppsala University, IIT Kanpur, and the University of Hyderabad, combines scientific expertise with 16+ years of entrepreneurial success in retail. With 60+ publications, multiple patents, and two successful ventures, he is driven by a vision to develop sustainable energy solutions through innovation and strategic leadership.', '/assets/images/team/founder-mallikarjuna.jpg', 'founder', 20),
  ('Noah Jacob', 'CTO', NULL, '/assets/images/team/core-noah.png', 'core', 10),
  ('Jan Nisa Ahad', 'Research Head', NULL, '/assets/images/team/core-jan-nisa.png', 'core', 20),
  ('Gyan Kumar Sah', 'Research Engineer', NULL, '/assets/images/team/core-gyan.jpeg', 'core', 30),
  ('Mesa Sai Gagan', 'Research Engineer', NULL, '/assets/images/team/core-gagan.jpg', 'core', 40),
  ('Dr. Jagadeesh Kalepu', 'Advisor', NULL, '/assets/images/team/advisor-jagadeesh.png', 'advisor', 10),
  ('Dr. Siddhartha Ghosh', 'Advisor', NULL, '/assets/images/team/advisor-siddhartha.jpg', 'advisor', 20),
  ('Lokesh Kumar', 'Advisor', NULL, '/assets/images/team/advisor-lokesh.avif', 'advisor', 30);