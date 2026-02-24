-- =========================================================================
-- SUPABASE REMOTE REPAIR SCRIPT
-- Run this in your Supabase Dashboard SQL Editor to sync the schema 
-- with the new frontend features (Galleries + Bookings).
-- =========================================================================

-- 1. Create Bookings Table for the Agenda feature
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

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(booking_date);

-- Ensure public anonymous inserts work (if RLS is used)
ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;

-- 2. Add Gallery Support to Certifications
ALTER TABLE certifications ADD COLUMN IF NOT EXISTS gallery TEXT[] DEFAULT '{}';
