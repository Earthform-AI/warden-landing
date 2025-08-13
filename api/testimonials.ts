import type { VercelRequest, VercelResponse } from '@vercel/node';

// Example API endpoint for managing real testimonials
// This would typically connect to a database in production

interface RealTestimonial {
  id: string;
  name: string;
  role: string;
  organization?: string;
  tools: string[];
  impact: string;
  metrics?: {
    quantifiedImpact: string;
    reachNumbers: number;
    timeframe: string;
  };
  verification: {
    status: 'verified' | 'pending' | 'placeholder';
    method: 'interview' | 'documentation' | 'referral';
    verifiedBy: string;
    verifiedDate?: Date;
  };
  consent: {
    publicUse: boolean;
    contactable: boolean;
    updatesConsent: boolean;
  };
  date: Date;
  lastUpdated: Date;
  verified: boolean;
}

// Mock data - in production this would come from a database
const mockRealTestimonials: RealTestimonial[] = [
  // Currently empty - will be populated as real testimonials are collected
];

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
        // Return verified testimonials for public display
        const verifiedTestimonials = mockRealTestimonials.filter(
          t => t.verification.status === 'verified' && t.consent.publicUse
        );
        
        res.status(200).json({
          testimonials: verifiedTestimonials,
          count: verifiedTestimonials.length,
          lastUpdated: new Date().toISOString()
        });
        break;

      case 'POST':
        // Submit new testimonial (would require authentication in production)
        const newTestimonial = req.body as Partial<RealTestimonial>;
        
        // Basic validation
        if (!newTestimonial.name || !newTestimonial.impact) {
          res.status(400).json({ error: 'Name and impact are required' });
          return;
        }

        // In production, this would save to database
        const testimonial: RealTestimonial = {
          id: Math.random().toString(36).substr(2, 9),
          name: newTestimonial.name,
          role: newTestimonial.role || '',
          organization: newTestimonial.organization,
          tools: newTestimonial.tools || [],
          impact: newTestimonial.impact,
          metrics: newTestimonial.metrics,
          verification: {
            status: 'pending',
            method: 'documentation',
            verifiedBy: 'system',
          },
          consent: {
            publicUse: true,
            contactable: false,
            updatesConsent: false,
            ...newTestimonial.consent
          },
          date: new Date(),
          lastUpdated: new Date(),
          verified: false
        };

        mockRealTestimonials.push(testimonial);
        
        res.status(201).json({
          message: 'Testimonial submitted for review',
          id: testimonial.id,
          status: 'pending'
        });
        break;

      default:
        res.status(405).json({ error: 'Method not allowed' });
        break;
    }
  } catch (error) {
    console.error('Testimonials API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      timestamp: new Date().toISOString()
    });
  }
}