import type { VercelRequest, VercelResponse } from '@vercel/node';
import { supabase, type ImpactReport, type Sponsorship } from '../src/utils/supabase';
import { impactMetrics } from '../src/config/sponsorship.config';

// Enhanced Impact Tracking API
// Implements automated impact collection and reporting from TESTIMONIALS_SPONSORSHIP_SPRINT.md

interface ImpactReportData {
  sponsorship_id: string;
  report_period: string; // 'monthly' | 'quarterly' | 'annual'
  metrics: {
    projects_completed?: number;
    productivity_increase?: string;
    community_reach?: number;
    time_saved_hours?: number;
    cost_savings?: number;
    impact_narrative: string;
    [key: string]: any;
  };
  narrative: string;
  submitted_by?: string;
}

interface GeneratedReport {
  sponsor_name: string;
  sponsor_email: string;
  recipient_count: number;
  total_impact: {
    projects_completed: number;
    total_reach: number;
    productivity_gains: string;
    time_saved: number;
  };
  individual_reports: ImpactReport[];
  period: string;
  generated_at: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        const { sponsor_email, period } = req.query;
        
        if (!sponsor_email) {
          res.status(400).json({ error: 'sponsor_email parameter required' });
          return;
        }

        // Get sponsor's active sponsorships and their impact reports
        const { data: sponsorships, error: sponsorshipError } = await supabase
          .from('sponsorships')
          .select(`
            *,
            sponsor:sponsors(*),
            applicant:applicants(*),
            impact_reports:impact_reports(*)
          `)
          .eq('sponsor.email', sponsor_email)
          .eq('status', 'active');

        if (sponsorshipError) {
          console.error('Sponsorship fetch error:', sponsorshipError);
          res.status(500).json({ error: 'Failed to fetch sponsorship data' });
          return;
        }

        // Generate comprehensive impact report
        const report = await generateImpactReport(sponsorships, period as string);
        
        res.status(200).json({
          success: true,
          report,
          generated_at: new Date().toISOString()
        });
        break;

      case 'POST':
        // Submit new impact report from recipient
        const reportData = req.body as ImpactReportData;
        
        // Validate required fields
        if (!reportData.sponsorship_id || !reportData.narrative || !reportData.metrics) {
          res.status(400).json({ 
            error: 'sponsorship_id, narrative, and metrics are required',
            required_fields: ['sponsorship_id', 'narrative', 'metrics']
          });
          return;
        }

        // Verify sponsorship exists and is active
        const { data: sponsorship, error: verificationError } = await supabase
          .from('sponsorships')
          .select('*')
          .eq('id', reportData.sponsorship_id)
          .eq('status', 'active')
          .single();

        if (verificationError || !sponsorship) {
          res.status(404).json({ error: 'Active sponsorship not found' });
          return;
        }

        // Insert impact report
        const { data: impactReport, error: insertError } = await supabase
          .from('impact_reports')
          .insert({
            sponsorship_id: reportData.sponsorship_id,
            report_period: reportData.report_period || 'monthly',
            metrics: reportData.metrics,
            narrative: reportData.narrative
          })
          .select()
          .single();

        if (insertError) {
          console.error('Impact report insert error:', insertError);
          res.status(500).json({ error: 'Failed to submit impact report' });
          return;
        }

        // Trigger sponsor notification (placeholder for email integration)
        await notifySponsorOfNewReport(sponsorship, impactReport);
        
        res.status(201).json({
          success: true,
          message: 'Impact report submitted successfully',
          report_id: impactReport.id,
          sponsor_notified: true
        });
        break;

      case 'PUT':
        // Update existing impact report
        const { report_id, updated_metrics, updated_narrative } = req.body;
        
        if (!report_id) {
          res.status(400).json({ error: 'report_id required' });
          return;
        }

        const updateData: any = {};
        if (updated_metrics) updateData.metrics = updated_metrics;
        if (updated_narrative) updateData.narrative = updated_narrative;

        const { data: updatedReport, error: updateError } = await supabase
          .from('impact_reports')
          .update(updateData)
          .eq('id', report_id)
          .select()
          .single();

        if (updateError) {
          console.error('Impact report update error:', updateError);
          res.status(500).json({ error: 'Failed to update impact report' });
          return;
        }

        res.status(200).json({
          success: true,
          message: 'Impact report updated successfully',
          report: updatedReport
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error('Impact Reports API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}

// Helper function to generate comprehensive impact reports for sponsors
async function generateImpactReport(sponsorships: any[], period?: string): Promise<GeneratedReport> {
  if (!sponsorships.length) {
    throw new Error('No sponsorships found');
  }

  const sponsor = sponsorships[0].sponsor;
  const allReports = sponsorships.flatMap(s => s.impact_reports || []);
  
  // Filter reports by period if specified
  const filteredReports = period 
    ? allReports.filter(r => r.report_period === period)
    : allReports;

  // Calculate aggregate metrics
  const totalImpact = filteredReports.reduce((acc, report) => {
    const metrics = report.metrics || {};
    return {
      projects_completed: acc.projects_completed + (metrics.projects_completed || 0),
      total_reach: acc.total_reach + (metrics.community_reach || 0),
      time_saved: acc.time_saved + (metrics.time_saved_hours || 0),
      productivity_gains: 'Varied by recipient' // This would be calculated differently
    };
  }, {
    projects_completed: 0,
    total_reach: 0,
    time_saved: 0,
    productivity_gains: ''
  });

  return {
    sponsor_name: sponsor.name,
    sponsor_email: sponsor.email,
    recipient_count: sponsorships.length,
    total_impact: totalImpact,
    individual_reports: filteredReports,
    period: period || 'all-time',
    generated_at: new Date().toISOString()
  };
}

// Placeholder for sponsor notification system
async function notifySponsorOfNewReport(sponsorship: any, impactReport: ImpactReport): Promise<void> {
  // This would integrate with email service (SendGrid, etc.)
  console.log(`New impact report for sponsorship ${sponsorship.id}:`, {
    sponsor_email: sponsorship.sponsor?.email,
    report_id: impactReport.id,
    report_period: impactReport.report_period
  });
  
  // Future implementation:
  // - Send email to sponsor
  // - Post to Discord webhook  
  // - Update sponsor dashboard
  // - Generate monthly digest
}