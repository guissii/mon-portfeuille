-- Phase 2 Migration: Education, Experiences, Bookings, Visibility

-- Education / Parcours scolaire
CREATE TABLE IF NOT EXISTS education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution VARCHAR(200) NOT NULL,
  degree VARCHAR(200) NOT NULL,
  field VARCHAR(200),
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT,
  location VARCHAR(200),
  logo_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experiences professionnelles
CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company VARCHAR(200) NOT NULL,
  position VARCHAR(200) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  description TEXT,
  responsibilities TEXT[] DEFAULT '{}',
  technologies TEXT[] DEFAULT '{}',
  location VARCHAR(200),
  company_url VARCHAR(500),
  logo_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Bookings / Agenda
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meeting_type VARCHAR(50) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time VARCHAR(10) NOT NULL,
  client_name VARCHAR(200) NOT NULL,
  client_email VARCHAR(200) NOT NULL,
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Engineering articles (from DB instead of hardcoded)
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(300) NOT NULL,
  slug VARCHAR(300) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category VARCHAR(50) NOT NULL,
  read_time INT DEFAULT 5,
  cover_image VARCHAR(500),
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add section visibility settings
INSERT INTO site_settings (key, value) VALUES
  ('section_projects', 'true'),
  ('section_certifications', 'true'),
  ('section_hackathons', 'true'),
  ('section_engineering', 'true'),
  ('section_agenda', 'true'),
  ('section_education', 'true'),
  ('section_experiences', 'true'),
  ('section_timeline', 'true')
ON CONFLICT (key) DO NOTHING;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_education_status ON education(status);
CREATE INDEX IF NOT EXISTS idx_experiences_status ON experiences(status);
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
