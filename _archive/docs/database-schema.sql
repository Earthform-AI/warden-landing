-- Supabase Database Schema for Warden Landing Sponsorship System
-- This file contains the SQL commands to set up the database tables

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Applicants table - stores AI tools access applications
CREATE TABLE applicants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  profile JSONB NOT NULL DEFAULT '{}',
  ai_tools_needed TEXT[] NOT NULL DEFAULT '{}',
  application_status VARCHAR(20) DEFAULT 'pending' CHECK (application_status IN ('pending', 'approved', 'rejected', 'sponsored')),
  sponsor_id UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsors table - stores sponsor information
CREATE TABLE sponsors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  organization VARCHAR(255),
  tier VARCHAR(50) NOT NULL,
  monthly_commitment DECIMAL(10,2) NOT NULL,
  motivation TEXT,
  sponsored_applicants UUID[] DEFAULT '{}',
  stripe_customer_id VARCHAR(255),
  stripe_subscription_id VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'cancelled', 'inactive', 'canceling')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsorships table - tracks active sponsor-applicant relationships
CREATE TABLE sponsorships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID NOT NULL REFERENCES sponsors(id) ON DELETE CASCADE,
  applicant_id UUID NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
  ai_tools_provided TEXT[] NOT NULL DEFAULT '{}',
  monthly_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'paused', 'completed', 'ended')),
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sponsor payments table - tracks Stripe payment history
CREATE TABLE sponsor_payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsor_id UUID REFERENCES sponsors(id) ON DELETE CASCADE,
  stripe_invoice_id VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('succeeded', 'failed', 'pending')),
  payment_date TIMESTAMP WITH TIME ZONE NOT NULL,
  failure_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Impact reports table - tracks the impact of sponsored applicants
CREATE TABLE impact_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sponsorship_id UUID NOT NULL REFERENCES sponsorships(id) ON DELETE CASCADE,
  report_period VARCHAR(20) NOT NULL,
  metrics JSONB DEFAULT '{}',
  narrative TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table (for future enhancement)
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  organization VARCHAR(255),
  tools TEXT[],
  impact TEXT NOT NULL,
  metrics JSONB,
  verification JSONB NOT NULL,
  consent JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_applicants_status ON applicants(application_status);
CREATE INDEX idx_applicants_email ON applicants(email);
CREATE INDEX idx_sponsors_email ON sponsors(email);
CREATE INDEX idx_sponsors_status ON sponsors(status);
CREATE INDEX idx_sponsors_stripe_customer ON sponsors(stripe_customer_id);
CREATE INDEX idx_sponsors_stripe_subscription ON sponsors(stripe_subscription_id);
CREATE INDEX idx_sponsorships_sponsor_id ON sponsorships(sponsor_id);
CREATE INDEX idx_sponsorships_applicant_id ON sponsorships(applicant_id);
CREATE INDEX idx_sponsorships_status ON sponsorships(status);
CREATE INDEX idx_sponsor_payments_sponsor_id ON sponsor_payments(sponsor_id);
CREATE INDEX idx_sponsor_payments_stripe_invoice ON sponsor_payments(stripe_invoice_id);

-- Contact submissions table — replaces Formspree for form handling
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  message TEXT,
  source VARCHAR(50) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at);

-- Allow anonymous inserts for the contact form (public-facing)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public inserts" ON contact_submissions
FOR INSERT WITH CHECK (true);
-- Only service role can read submissions
CREATE POLICY "Service role can read submissions" ON contact_submissions
FOR SELECT USING (auth.role() = 'service_role');

CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add foreign key constraint for applicant sponsor_id
ALTER TABLE applicants ADD CONSTRAINT fk_applicants_sponsor FOREIGN KEY (sponsor_id) REFERENCES sponsors(id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to applicants and sponsors tables
CREATE TRIGGER update_applicants_updated_at BEFORE UPDATE ON applicants FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_sponsors_updated_at BEFORE UPDATE ON sponsors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies for data protection
ALTER TABLE applicants ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsors ENABLE ROW LEVEL SECURITY;
ALTER TABLE sponsorships ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_reports ENABLE ROW LEVEL SECURITY;

-- Allow public read access to approved applicants (for sponsor browsing)
CREATE POLICY "Public can view approved applicants" ON applicants
FOR SELECT USING (application_status = 'approved');

-- Allow applicants to view and update their own data
CREATE POLICY "Users can view own applications" ON applicants
FOR SELECT USING (auth.uid()::text = email);

CREATE POLICY "Users can update own applications" ON applicants
FOR UPDATE USING (auth.uid()::text = email);

-- Allow sponsors to view and update their own data
CREATE POLICY "Sponsors can view own data" ON sponsors
FOR SELECT USING (auth.uid()::text = email);

CREATE POLICY "Sponsors can update own data" ON sponsors
FOR UPDATE USING (auth.uid()::text = email);

-- Allow sponsors to view sponsorships they're involved in
CREATE POLICY "Sponsors can view their sponsorships" ON sponsorships
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM sponsors 
    WHERE sponsors.id = sponsorships.sponsor_id 
    AND sponsors.email = auth.uid()::text
  )
);

-- Allow applicants to view sponsorships they're involved in
CREATE POLICY "Applicants can view their sponsorships" ON sponsorships
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM applicants 
    WHERE applicants.id = sponsorships.applicant_id 
    AND applicants.email = auth.uid()::text
  )
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;