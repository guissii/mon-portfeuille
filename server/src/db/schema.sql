-- Portfolio Database Schema
-- PostgreSQL

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

-- Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(200) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_sign_in TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category_id);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_certifications_status ON certifications(status);
CREATE INDEX IF NOT EXISTS idx_hackathons_status ON hackathons(status);
CREATE INDEX IF NOT EXISTS idx_timeline_date ON timeline_events(event_date);
CREATE INDEX IF NOT EXISTS idx_screenshots_project ON project_screenshots(project_id);
