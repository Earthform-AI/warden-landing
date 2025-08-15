-- Schema Migration/Compatibility Patch for Warden Landing
-- This script ensures compatibility between current schema and the provided issue schema
-- Run this in Supabase SQL Editor if needed

-- NOTE: The current schema is already compatible with the issue schema
-- This file documents the differences and provides optional alignment commands

-- 1. Data types are compatible:
--    VARCHAR(255) = character varying
--    DECIMAL(10,2) = numeric
--    TEXT[] = ARRAY (both are valid PostgreSQL syntax)

-- 2. The current schema has BETTER features than the issue schema:
--    - Performance indexes
--    - updated_at triggers  
--    - Row Level Security policies
--    - CASCADE DELETE for data integrity

-- Optional: If you want exact type matching with the issue schema, run these commands:
-- (WARNING: This is NOT RECOMMENDED as it removes beneficial features)

/*
-- Change VARCHAR to character varying (optional - both work the same)
ALTER TABLE applicants ALTER COLUMN name TYPE character varying;
ALTER TABLE applicants ALTER COLUMN email TYPE character varying;
ALTER TABLE sponsors ALTER COLUMN name TYPE character varying;
ALTER TABLE sponsors ALTER COLUMN email TYPE character varying;
ALTER TABLE sponsors ALTER COLUMN organization TYPE character varying;
ALTER TABLE sponsors ALTER COLUMN tier TYPE character varying;
ALTER TABLE sponsors ALTER COLUMN stripe_subscription_id TYPE character varying;

-- Change DECIMAL to numeric (optional - both work the same)
ALTER TABLE sponsors ALTER COLUMN monthly_commitment TYPE numeric;
ALTER TABLE sponsorships ALTER COLUMN monthly_amount TYPE numeric;

-- Add explicit type casting to defaults (optional)
ALTER TABLE applicants ALTER COLUMN ai_tools_needed SET DEFAULT '{}'::text[];
ALTER TABLE sponsors ALTER COLUMN sponsored_applicants SET DEFAULT '{}'::uuid[];
ALTER TABLE sponsorships ALTER COLUMN ai_tools_provided SET DEFAULT '{}'::text[];
*/

-- VERIFICATION QUERIES:
-- Run these to verify your schema matches expectations

-- Check table exists and structure
SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name IN ('applicants', 'sponsors', 'sponsorships', 'impact_reports', 'testimonials')
ORDER BY table_name, ordinal_position;

-- Check constraints
SELECT tc.constraint_name, tc.table_name, tc.constraint_type, 
       cc.check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc 
  ON tc.constraint_name = cc.constraint_name
WHERE tc.table_schema = 'public' 
  AND tc.table_name IN ('applicants', 'sponsors', 'sponsorships', 'impact_reports', 'testimonials');

-- Check foreign keys
SELECT tc.constraint_name, tc.table_name, kcu.column_name, 
       ccu.table_name AS foreign_table_name,
       ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc 
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY' 
  AND tc.table_schema = 'public'
  AND tc.table_name IN ('applicants', 'sponsors', 'sponsorships', 'impact_reports', 'testimonials');

-- Check indexes
SELECT indexname, tablename, indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename IN ('applicants', 'sponsors', 'sponsorships', 'impact_reports', 'testimonials');