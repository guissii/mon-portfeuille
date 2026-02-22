-- Migration: Add pdf_url to projects and hackathon_screenshots table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS pdf_url VARCHAR(500);

-- Hackathon screenshots table (structured, similar to project_screenshots)
CREATE TABLE IF NOT EXISTS hackathon_screenshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hackathon_id UUID REFERENCES hackathons(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  caption VARCHAR(300),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_hackathon_screenshots_hackathon ON hackathon_screenshots(hackathon_id);
