-- Migration: Add admin visibility controls for hackathon results
-- Allows admin to independently show/hide score and ranking position

ALTER TABLE hackathons ADD COLUMN IF NOT EXISTS score INTEGER;
ALTER TABLE hackathons ADD COLUMN IF NOT EXISTS show_score BOOLEAN DEFAULT false;
ALTER TABLE hackathons ADD COLUMN IF NOT EXISTS show_position BOOLEAN DEFAULT true;
