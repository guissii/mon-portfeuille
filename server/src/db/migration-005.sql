-- Add gallery column to certifications table
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}';
