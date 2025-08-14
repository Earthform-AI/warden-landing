import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database schema types
export interface Applicant {
  id: string;
  name: string;
  email: string;
  profile: {
    background: string;
    contributions: string;
    github_url?: string;
    portfolio_url?: string;
    linkedin_url?: string;
  };
  ai_tools_needed: string[];
  application_status: 'pending' | 'approved' | 'rejected' | 'sponsored';
  sponsor_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Sponsor {
  id: string;
  name: string;
  email: string;
  organization?: string;
  tier: string;
  monthly_commitment: number;
  sponsored_applicants: string[]; // Array of applicant IDs
  stripe_subscription_id?: string;
  status: 'active' | 'paused' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Sponsorship {
  id: string;
  sponsor_id: string;
  applicant_id: string;
  ai_tools_provided: string[];
  monthly_amount: number;
  status: 'active' | 'paused' | 'completed';
  start_date: string;
  end_date?: string;
  created_at: string;
}

export interface ImpactReport {
  id: string;
  sponsorship_id: string;
  report_period: string;
  metrics: {
    projects_completed?: number;
    productivity_increase?: string;
    community_impact?: string;
  };
  narrative: string;
  created_at: string;
}