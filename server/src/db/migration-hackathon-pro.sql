-- ═══════════════════════════════════════════════════════════════════
-- MIGRATION: Hackathon Module Pro v2 — Icon + Visibility Controls
-- ═══════════════════════════════════════════════════════════════════
-- Safe — uses IF NOT EXISTS everywhere.
-- ═══════════════════════════════════════════════════════════════════

-- Admin visibility controls
ALTER TABLE hackathons ADD COLUMN IF NOT EXISTS score INTEGER;
ALTER TABLE hackathons ADD COLUMN IF NOT EXISTS show_score BOOLEAN DEFAULT false;
ALTER TABLE hackathons ADD COLUMN IF NOT EXISTS show_position BOOLEAN DEFAULT true;

-- Admin icon picker (Lucide icon name)
ALTER TABLE hackathons ADD COLUMN IF NOT EXISTS icon VARCHAR(50) DEFAULT 'Trophy';