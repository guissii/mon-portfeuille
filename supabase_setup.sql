-- 1. Create Tables (Base Schema)
-- -------------------------------------------------------

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(30),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  tagline VARCHAR(300),
  description TEXT,
  problem TEXT,
  solution TEXT,
  impact TEXT,
  metrics JSONB DEFAULT '[]',
  stack JSONB DEFAULT '{}',
  learnings TEXT[] DEFAULT '{}',
  cover_image VARCHAR(500),
  gallery TEXT[] DEFAULT '{}',
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  demo_url VARCHAR(500),
  documentation_url VARCHAR(500),
  pdf_url VARCHAR(500),
  role VARCHAR(100),
  team_size INT,
  duration VARCHAR(50),
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Screenshots
CREATE TABLE IF NOT EXISTS project_screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(300),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certifications
CREATE TABLE IF NOT EXISTS certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  issuer VARCHAR(200) NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  credential_id VARCHAR(100),
  verify_url VARCHAR(500),
  description TEXT,
  skills TEXT[] DEFAULT '{}',
  image_url VARCHAR(500),
  badge_url VARCHAR(500),
  level VARCHAR(20) DEFAULT 'intermediate',
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Hackathons
CREATE TABLE IF NOT EXISTS hackathons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(200) NOT NULL,
  slug VARCHAR(200) UNIQUE NOT NULL,
  organizer VARCHAR(200),
  event_date DATE,
  duration VARCHAR(50),
  result VARCHAR(20),
  project_name VARCHAR(200),
  project_description TEXT,
  linked_project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  role VARCHAR(100),
  team_size INT,
  team_members TEXT[],
  problem TEXT,
  solution TEXT,
  implementation TEXT,
  learnings TEXT[] DEFAULT '{}',
  tech_stack TEXT[] DEFAULT '{}',
  demo_url VARCHAR(500),
  repo_url VARCHAR(500),
  slides_url VARCHAR(500),
  video_url VARCHAR(500),
  certificate_url VARCHAR(500),
  images TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Timeline Events
CREATE TABLE IF NOT EXISTS timeline_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  event_type VARCHAR(50) NOT NULL,
  linked_id UUID,
  icon VARCHAR(50),
  color VARCHAR(30),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_type VARCHAR(50) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time VARCHAR(10) NOT NULL,
  client_name VARCHAR(200) NOT NULL,
  client_email VARCHAR(200) NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Configure Row Level Security (RLS)
-- -------------------------------------------------------

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hackathons ENABLE ROW LEVEL SECURITY;
ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Public READ Access (Allow everyone to view published content)
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Projects" ON projects FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Screenshots" ON project_screenshots FOR SELECT USING (true);
CREATE POLICY "Public Read Certifications" ON certifications FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Hackathons" ON hackathons FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Timeline" ON timeline_events FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON site_settings FOR SELECT USING (true);

-- Public WRITE Access for Bookings (Allow anyone to book)
CREATE POLICY "Public Insert Bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Admin WRITE Access (Require authentication)
CREATE POLICY "Admin All Categories" ON categories FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Projects" ON projects FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Screenshots" ON project_screenshots FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Certifications" ON certifications FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Hackathons" ON hackathons FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Timeline" ON timeline_events FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Settings" ON site_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin All Bookings" ON bookings FOR ALL TO authenticated USING (true);

-- 3. Storage Configuration (Manual step in Dashboard)
-- -------------------------------------------------------
-- Create a public bucket named 'portfolio'
-- Enable public read access to the bucket
